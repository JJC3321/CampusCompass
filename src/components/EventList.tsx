"use client";

import { Resource } from "@/types";
import EventCard from "./EventCard";

interface EventListProps {
  readonly resources: readonly Resource[];
  readonly loading: boolean;
}

function Skeleton() {
  return (
    <div className="space-y-3">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="animate-pulse rounded-xl border border-slate-100 bg-white p-4"
        >
          <div className="flex gap-3">
            <div className="h-16 w-1 rounded-full bg-slate-200" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-16 rounded-full bg-slate-200" />
              <div className="h-4 w-3/4 rounded bg-slate-200" />
              <div className="h-3 w-full rounded bg-slate-100" />
              <div className="h-3 w-2/3 rounded bg-slate-100" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function EventList({ resources, loading }: EventListProps) {
  if (loading) {
    return (
      <div className="h-full overflow-y-auto p-4 custom-scrollbar">
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
          Resources
        </h2>
        <Skeleton />
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto p-4 custom-scrollbar">
      <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
        Resources ({resources.length})
      </h2>

      {resources.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <svg
            className="mb-3 h-12 w-12 text-slate-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-sm text-slate-400">No resources found</p>
          <p className="mt-1 text-xs text-slate-300">
            Try adjusting your filters
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {resources.map((resource, index) => (
            <EventCard
              key={resource.id}
              resource={resource}
              style={{ animationDelay: `${index * 60}ms` }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
