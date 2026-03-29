"use client";

import { useState, useCallback } from "react";
import { ChatMessage, UserProfile } from "@/types";

export function useChat() {
  const [messages, setMessages] = useState<readonly ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = useCallback(
    async (text: string, userProfile: UserProfile) => {
      const userMessage: ChatMessage = { role: "user", content: text };

      setMessages((prev) => [...prev, userMessage]);
      setLoading(true);

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: text,
            history: [...messages, userMessage],
            userProfile,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to get response");
        }

        const data = await response.json();
        const assistantMessage: ChatMessage = {
          role: "assistant",
          content: data.reply,
        };

        setMessages((prev) => [...prev, assistantMessage]);
      } catch {
        const errorMessage: ChatMessage = {
          role: "assistant",
          content: "Sorry, I couldn't process that. Please try again.",
        };
        setMessages((prev) => [...prev, errorMessage]);
      } finally {
        setLoading(false);
      }
    },
    [messages]
  );

  return { messages, loading, sendMessage };
}
