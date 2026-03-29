# CampusCompass

**CampusCompass** is an AI-powered resource discovery platform built for NYC college students. It connects students with scholarships, mental health support, learning programs, and more — personalized to who they are and where they go to school.

Built at **RamHacks** by a team that believes financial and personal barriers should never get in the way of a student's potential.

---

## The Problem

NYC college students are surrounded by resources — scholarships, wellness programs, tutoring, food assistance — but most never find them. The information is scattered, hard to search, and rarely tailored to the student's background or school.

## Our Solution

CampusCompass brings everything into one place. Students sign in, tell us a little about themselves, and instantly get a personalized map of resources near their campus. An AI assistant helps them dig deeper, answering questions and surfacing opportunities they didn't know existed.

---

## Features

- **Personalized resource map** — scholarships, mental health, learning programs, and more pinned to real NYC locations
- **AI chat assistant** — powered by OpenRouter, helps students find what they need in plain language
- **Smart filtering** — filter by category, location, and relevance to your profile
- **Persistent login** — sign in once with WorkOS AuthKit, preferences saved automatically
- **Save resources** — pin resources to revisit later

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Auth | WorkOS AuthKit |
| AI | OpenRouter (free tier) |
| Search | Tavily API |
| Map | React Leaflet |
| Styling | Tailwind CSS |

---

## Getting Started

### Prerequisites

You'll need API keys for:
- [WorkOS](https://workos.com) — authentication
- [OpenRouter](https://openrouter.ai) — AI chat and resource filtering
- [Tavily](https://tavily.com) — web search

### Setup

1. Clone the repo and install dependencies:

```bash
npm install
```

2. Create a `.env.local` file in the project root:

```env
WORKOS_API_KEY=your_workos_api_key
WORKOS_CLIENT_ID=your_workos_client_id
NEXT_PUBLIC_WORKOS_REDIRECT_URI=http://localhost:3000/api/auth/callback
WORKOS_COOKIE_PASSWORD=your_32_plus_char_secret  # generate: openssl rand -base64 32

OPENROUTER_API_KEY=your_openrouter_api_key
OPENROUTER_MODEL=openrouter/free

TAVILY_API_KEY=your_tavily_api_key
```

3. Run the dev server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see it running.

---

## Team

Built with care at RamHacks — for NYC students, by NYC students.
