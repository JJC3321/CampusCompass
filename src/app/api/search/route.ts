import { NextResponse } from "next/server";
import { searchResources } from "@/lib/tavily";
import { parseResults } from "@/lib/parse-results";
import { getSchoolByName } from "@/lib/schools";
import { SearchRequest } from "@/types";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as SearchRequest;

    if (!body.school || !body.gender || !body.raceEthnicity) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (body.school.length > 100 || body.raceEthnicity.length > 100) {
      return NextResponse.json(
        { error: "Input too long" },
        { status: 400 }
      );
    }

    const school = getSchoolByName(body.school);
    if (!school) {
      return NextResponse.json(
        { error: "Unknown school" },
        { status: 400 }
      );
    }

    const categorizedResults = await searchResources(body);
    const resources = parseResults(categorizedResults, school);

    return NextResponse.json({ resources });
  } catch (error) {
    console.error("Search API error:", error);
    return NextResponse.json(
      { error: "Failed to search resources. Please try again." },
      { status: 500 }
    );
  }
}
