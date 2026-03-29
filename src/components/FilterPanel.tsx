"use client";

import { Category, CATEGORY_COLORS, CATEGORY_LABELS } from "@/types";
import ChatInput from "./ChatInput";
import { ChatMessage, UserProfile } from "@/types";

interface FilterPanelProps {
  readonly activeFilters: ReadonlySet<Category>;
  readonly onToggle: (category: Category) => void;
  readonly chatMessages: readonly ChatMessage[];
  readonly chatLoading: boolean;
  readonly onChatSend: (message: string, profile: UserProfile) => void;
  readonly userProfile: UserProfile;
}

const CATEGORIES: readonly Category[] = [
  "scholarships",
  "mental-health",
  "learning",
];

export default function FilterPanel({
  activeFilters,
  onToggle,
  chatMessages,
  chatLoading,
  onChatSend,
  userProfile,
}: FilterPanelProps) {
  return (
    <div className="flex h-full flex-col">
      {/* Filters */}
      <div className="p-4">
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
          Filters
        </h2>
        <div className="space-y-2">
          {CATEGORIES.map((category) => {
            const isActive = activeFilters.has(category);
            return (
              <button
                key={category}
                onClick={() => onToggle(category)}
                className="group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-transform duration-200 hover:bg-slate-50 active:scale-[0.98]"
              >
                <span
                  className="flex h-3 w-3 shrink-0 rounded-full transition-opacity duration-200"
                  style={{
                    backgroundColor: CATEGORY_COLORS[category],
                    opacity: isActive ? 1 : 0.25,
                  }}
                />
                <span
                  className={`text-sm transition-opacity duration-200 ${
                    isActive
                      ? "font-medium text-slate-900"
                      : "text-slate-400"
                  }`}
                >
                  {CATEGORY_LABELS[category]}
                </span>
                {/* Toggle indicator */}
                <span
                  className={`ml-auto h-5 w-9 shrink-0 rounded-full transition-transform duration-200 ${
                    isActive ? "bg-slate-900" : "bg-slate-200"
                  } relative`}
                >
                  <span
                    className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-transform duration-200 ${
                      isActive ? "translate-x-4" : "translate-x-0.5"
                    }`}
                  />
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Divider */}
      <div className="mx-4 border-t border-slate-100" />

      {/* Chat */}
      <div className="flex min-h-0 flex-1 flex-col p-4">
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
          AI Assistant
        </h2>
        <ChatInput
          messages={chatMessages}
          loading={chatLoading}
          onSend={(msg) => onChatSend(msg, userProfile)}
        />
      </div>
    </div>
  );
}
