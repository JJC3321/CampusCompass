"use client";

import { useState, useRef, useEffect } from "react";
import { ChatMessage } from "@/types";

interface ChatInputProps {
  readonly messages: readonly ChatMessage[];
  readonly loading: boolean;
  readonly onSend: (message: string) => void;
}

export default function ChatInput({
  messages,
  loading,
  onSend,
}: ChatInputProps) {
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (input.trim() && !loading) {
      onSend(input.trim());
      setInput("");
    }
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      {/* Messages */}
      <div
        ref={scrollRef}
        className="custom-scrollbar flex-1 space-y-3 overflow-y-auto"
      >
        {messages.length === 0 && (
          <p className="text-center text-xs text-slate-400">
            Ask about resources near your school...
          </p>
        )}
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] rounded-xl px-3 py-2 text-xs leading-relaxed ${
                msg.role === "user"
                  ? "bg-slate-900 text-white"
                  : "bg-slate-100 text-slate-700"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="flex gap-1 rounded-xl bg-slate-100 px-3 py-2">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-slate-400" />
              <span
                className="h-1.5 w-1.5 animate-pulse rounded-full bg-slate-400"
                style={{ animationDelay: "0.15s" }}
              />
              <span
                className="h-1.5 w-1.5 animate-pulse rounded-full bg-slate-400"
                style={{ animationDelay: "0.3s" }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="mt-3 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask anything..."
          maxLength={500}
          className="min-w-0 flex-1 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:border-scholarship focus:bg-white focus:outline-none focus:ring-1 focus:ring-scholarship/20"
        />
        <button
          type="submit"
          disabled={!input.trim() || loading}
          className="shrink-0 rounded-lg bg-slate-900 p-2 text-white transition-transform duration-200 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 active:scale-95 disabled:opacity-40 disabled:hover:scale-100"
        >
          <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            />
          </svg>
        </button>
      </form>
    </div>
  );
}
