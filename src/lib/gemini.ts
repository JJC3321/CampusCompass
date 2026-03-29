import { GoogleGenerativeAI } from "@google/generative-ai";
import { ChatMessage, UserProfile } from "@/types";

function getGenAI() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not configured");
  }
  return new GoogleGenerativeAI(apiKey);
}

export async function chatWithGemini(
  message: string,
  history: readonly ChatMessage[],
  userProfile: UserProfile
): Promise<string> {
  const model = getGenAI().getGenerativeModel({
    model: "gemini-2.0-flash",
    systemInstruction: `You are a helpful assistant for ${userProfile.fullName}, a student at ${userProfile.school}. Help them find scholarships, mental health resources, and learning programs in NYC. Be concise, actionable, and encouraging. If they ask about specific programs, provide real information when possible. Keep responses under 150 words.`,
  });

  const chat = model.startChat({
    history: history.map((msg) => ({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.content }],
    })),
  });

  const result = await chat.sendMessage(message);
  const response = result.response;
  return response.text();
}
