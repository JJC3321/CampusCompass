import { Category, Resource, SchoolInfo } from "@/types";
import { CategorizedResults } from "./tavily";

function generateId(): string {
  return Math.random().toString(36).slice(2, 11);
}

function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + "…";
}

function extractDomain(url: string): string {
  try {
    return new URL(url).hostname.replace("www.", "");
  } catch {
    return "Unknown";
  }
}

function offsetCoordinate(base: number, range: number = 0.008): number {
  return base + (Math.random() - 0.5) * range;
}

export function parseResults(
  categorizedResults: readonly CategorizedResults[],
  school: SchoolInfo
): readonly Resource[] {
  const seen = new Set<string>();

  const resources: Resource[] = [];

  for (const group of categorizedResults) {
    for (const result of group.results) {
      if (seen.has(result.url)) continue;
      seen.add(result.url);

      resources.push({
        id: generateId(),
        title: truncate(result.title, 120),
        description: truncate(result.content, 200),
        url: result.url,
        category: group.category as Category,
        lat: offsetCoordinate(school.lat),
        lng: offsetCoordinate(school.lng),
        location: extractDomain(result.url),
        date: null,
      });
    }
  }

  return resources;
}
