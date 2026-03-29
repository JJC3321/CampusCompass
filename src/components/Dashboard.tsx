"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { UserProfile } from "@/types";
import { getSchoolByName } from "@/lib/schools";
import { useResources } from "@/hooks/useResources";
import { useChat } from "@/hooks/useChat";
import SearchBar from "./SearchBar";
import FilterPanel from "./FilterPanel";
import EventList from "./EventList";
import MobileNav from "./MobileNav";

const MapView = dynamic(() => import("./MapView"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center rounded-xl bg-slate-100">
      <div className="text-sm text-slate-400">Loading map...</div>
    </div>
  ),
});

interface DashboardProps {
  readonly userProfile: UserProfile;
}

export default function Dashboard({ userProfile }: DashboardProps) {
  const {
    resources,
    loading,
    activeFilters,
    fetchResources,
    searchResources,
    toggleFilter,
  } = useResources();
  const { messages, loading: chatLoading, sendMessage } = useChat();
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const bottomSheetRef = useRef<HTMLDivElement>(null);

  const school = getSchoolByName(userProfile.school);
  const center: [number, number] = school
    ? [school.lat, school.lng]
    : [40.7128, -74.006];

  useEffect(() => {
    fetchResources({
      school: userProfile.school,
      gender: userProfile.gender,
      raceEthnicity: userProfile.raceEthnicity,
    });
  }, [fetchResources, userProfile]);

  function handleSearch(query: string) {
    searchResources(query, {
      school: userProfile.school,
      gender: userProfile.gender,
      raceEthnicity: userProfile.raceEthnicity,
    });
  }

  return (
    <div className="flex h-screen flex-col bg-surface-50">
      {/* Top bar */}
      <div className="flex items-center gap-3 border-b border-slate-100 bg-white px-4 py-3">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-scholarship to-learning">
            <svg
              className="h-4 w-4 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>
          <span className="hidden text-sm font-bold text-slate-900 sm:inline">
            StudentMap
          </span>
        </div>

        {/* Search */}
        <div className="flex-1">
          <SearchBar onSearch={handleSearch} loading={loading} />
        </div>
      </div>

      {/* Three-panel layout */}
      <div className="flex min-h-0 flex-1">
        {/* Left panel - Filters (hidden on mobile) */}
        <div className="hidden w-[260px] shrink-0 border-r border-slate-100 bg-white md:flex md:flex-col">
          <FilterPanel
            activeFilters={activeFilters}
            onToggle={toggleFilter}
            chatMessages={messages}
            chatLoading={chatLoading}
            onChatSend={sendMessage}
            userProfile={userProfile}
          />
        </div>

        {/* Center panel - Map */}
        <div className="relative flex-1">
          <MapView resources={resources} center={center} />

          {/* Mobile bottom sheet toggle */}
          <button
            onClick={() => setShowBottomSheet(!showBottomSheet)}
            className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2 rounded-full bg-white px-4 py-2 text-xs font-medium text-slate-700 shadow-lg transition-transform duration-200 hover:scale-105 active:scale-95 md:hidden"
          >
            {showBottomSheet ? "Show Map" : `View Resources (${resources.length})`}
          </button>
        </div>

        {/* Right panel - Event list (hidden on mobile unless bottom sheet open) */}
        <div
          className={`${
            showBottomSheet
              ? "fixed inset-x-0 bottom-0 z-30 h-[60vh] animate-slide-in-bottom rounded-t-2xl shadow-2xl"
              : "hidden"
          } w-full border-l border-slate-100 bg-white md:relative md:flex md:h-auto md:w-[360px] md:shrink-0 md:animate-none md:rounded-none md:shadow-none`}
        >
          {/* Drag handle (mobile) */}
          {showBottomSheet && (
            <div className="flex justify-center py-2 md:hidden">
              <div className="h-1 w-8 rounded-full bg-slate-300" />
            </div>
          )}
          <div
            ref={bottomSheetRef}
            className="flex-1 overflow-hidden md:flex md:flex-col"
          >
            <EventList resources={resources} loading={loading} />
          </div>
        </div>
      </div>
    </div>
  );
}
