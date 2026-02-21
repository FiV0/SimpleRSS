# SimpleRSS

A simple RSS feed reader web application built with React, TypeScript, and Supabase.

## Tech Stack

- **Frontend**: React 19 + TypeScript + Vite 7
- **Styling**: Tailwind CSS 4 + shadcn/ui (New York style)
- **Backend**: Supabase (PostgreSQL + Edge Functions)

## Prerequisites

- [Node.js](https://nodejs.org/) 20+
- [Supabase CLI](https://supabase.com/docs/guides/local-development/cli/getting-started) — install via `npm install -g supabase` or `brew install supabase/tap/supabase`
- [Docker](https://www.docker.com/) — required by Supabase CLI to run the local stack (PostgreSQL, Auth, Studio, etc.)

## Getting Started

```bash
# 1. Start the Supabase backend (runs migrations + seeds the database)
cd supabase && supabase start

# 2. Install frontend dependencies
cd frontend && npm install

# 3. Start the dev server
npm run dev
```

The frontend will be at `http://localhost:5173` and Supabase Studio at `http://localhost:54323`.

### Running Tests

```bash
cd frontend
npm test          # watch mode
npm run test:run  # single run
```

## Data
- `data/feeds.txt` — 30,304 RSS feed URLs for seeding
- `data/no_rss.txt` — 993 URLs without valid RSS feeds
