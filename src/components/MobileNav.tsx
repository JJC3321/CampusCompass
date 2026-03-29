"use client";

import { useState } from "react";
import { Category, UserProfile, ChatMessage } from "@/types";
import FilterPanel from "./FilterPanel";

interface MobileNavProps {
  readonly activeFilters: ReadonlySet<Category>;
  readonly onToggle: (category: Category) => void;
  readonly chatMessages: readonly ChatMessage[];
  readonly chatLoading: boolean;
  readonly onChatSend: (message: string, profile: UserProfile) => void;
  readonly userProfile: UserProfile;
}

export default function MobileNav({
  activeFilters,
  onToggle,
  chatMessages,
  chatLoading,
  onChatSend,
  userProfile,
}: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Hamburger button */}
      <button
        onClick={() => setIsOpen(true)}
        className="rounded-lg border border-slate-200 bg-white p-2 shadow-sm transition-transform duration-200 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-scholarship focus-visible:ring-offset-2 active:scale-95 md:hidden"
        aria-label="Open filters"
      >
        <svg
          className="h-5 w-5 text-slate-700"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
          />
        </svg>
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-80 max-w-[85vw] bg-white shadow-2xl transition-transform duration-300 md:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Close button */}
        <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
          <span className="text-sm font-semibold text-slate-900">
            Filters & Chat
          </span>
          <button
            onClick={() => setIsOpen(false)}
            className="rounded-lg p-1.5 text-slate-400 transition-transform duration-200 hover:scale-110 hover:text-slate-600 active:scale-95"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <FilterPanel
          activeFilters={activeFilters}
          onToggle={onToggle}
          chatMessages={chatMessages}
          chatLoading={chatLoading}
          onChatSend={onChatSend}
          userProfile={userProfile}
        />
      </div>
    </>
  );
}
