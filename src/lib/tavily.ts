import { tavily } from "@tavily/core";
import { GeminiSuggestion } from "./gemini";
import { Category, SearchRequest } from "@/types";

function getClient() {
  const apiKey = process.env.TAVILY_API_KEY;
  if (!apiKey) {
    throw new Error("TAVILY_API_KEY is not configured");
  }
  return tavily({ apiKey });
}

interface TavilyResult {
  readonly title: string;
  readonly url: string;
  readonly content: string;
}

export interface CategorizedResults {
  readonly category: Category;
  readonly results: readonly TavilyResult[];
}

function buildQueries(profile: SearchRequest): readonly string[] {
  const { school, raceEthnicity, query } = profile;

  const queries = [
    `${school} scholarships financial aid ${raceEthnicity !== "Prefer not to say" ? raceEthnicity : ""} students 2026`,
    `free mental health counseling wellness resources NYC college students near ${school}`,
    `food pantry food assistance free meals NYC college students near ${school}`,
    `affordable student housing housing assistance NYC college students near ${school}`,
    `career prep internship mentorship programs NYC college students ${school}`,
  ];

  if (query) {
    return [...queries, `${query} ${school} NYC students`];
  }

  return queries;
}

export async function searchFromSuggestions(
  suggestions: readonly GeminiSuggestion[]
): Promise<readonly CategorizedResults[]> {
  return searchWithQueries(
    suggestions.map((s) => ({
      query: s.domain ? `${s.query} site:${s.domain}` : s.query,
      category: s.category,
    }))
  );
}

export async function searchResources(
  profile: SearchRequest
): Promise<readonly CategorizedResults[]> {
  const queries = buildQueries(profile);
  const categories: readonly Category[] = [
    "scholarships",
    "mental-health",
    "food-security",
    "housing",
    "career-prep",
  ];

  const searchItems = queries.map((query, index) => ({
    query,
    category: categories[index] || "other",
  }));

  return searchWithQueries(searchItems);
}

async function searchWithQueries(
  items: readonly { query: string; category: string }[]
): Promise<readonly CategorizedResults[]> {
  const results = await Promise.allSettled(
    items.map((item) =>
      getClient().search(item.query, {
        searchDepth: "advanced",
        maxResults: 2,
      })
    )
  );

  // Group results by category with deduplication
  const grouped = new Map<string, TavilyResult[]>();
  const seenUrls = new Set<string>();

  results.forEach((result, index) => {
    const category = items[index].category;
    if (!grouped.has(category)) {
      grouped.set(category, []);
    }

    if (result.status === "fulfilled") {
      const items = (result.value.results ?? [])
        .map(
          (r: { title: string; url: string; content: string }) => ({
            title: r.title,
            url: r.url,
            content: r.content,
          })
        )
        .filter((item: TavilyResult) => {
          // Deduplicate by URL across all categories
          const normalizedUrl = item.url.toLowerCase().replace(/\/+$/, "");
          if (seenUrls.has(normalizedUrl)) {
            return false;
          }
          seenUrls.add(normalizedUrl);
          return true;
        });
      grouped.get(category)!.push(...items);
    }
  });

  return Array.from(grouped.entries())
    .map(([category, items]) => ({
      category: category as CategorizedResults["category"],
      results: items,
    }))
    .filter((r) => r.results.length > 0);
}
