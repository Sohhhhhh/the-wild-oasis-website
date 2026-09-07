# The Wild Oasis

A public-facing website for The Wild Oasis — a cabin getaway where guests can browse cabins, check availability, and make bookings. This repository contains the Next.js + TypeScript front-end and server code that integrates with Supabase for data and authentication.

## What this project does

- Lists cabins with descriptions and images
- Displays availability calendars and booking flows
- Guest sign-in via Google (next-auth)
- Reservation creation, viewing and management
- Settings and basic site configuration stored in Supabase

## Tech stack

- Next.js (App Router) + TypeScript
- React (server + client components)
- Supabase (database + storage)
- next-auth (Google provider)
- Tailwind CSS (via PostCSS) and Heroicons
- date-fns for date handling

## Getting started

Prerequisites: Node 18+ and an active Supabase project.

1. Install dependencies

```bash
npm install
```

2. Create a local environment file

Create a `.env.local` file in the project root with the following variables (replace placeholders):

```env
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_anon_or_service_key
AUTH_GOOGLE_ID=your_google_oauth_client_id
AUTH_GOOGLE_SECRET=your_google_oauth_client_secret
RESTCOUNTRIES_API_KEY=optional_restcountries_api_key
NEXTAUTH_SECRET=some_long_random_value
NEXTAUTH_URL=http://localhost:3000
```

Notes:

- Use an anon key for client-side Supabase operations and a service role key only for server-side operations if needed — never commit service keys.
- `RESTCOUNTRIES_API_KEY` is optional and used when fetching country data; the app may fall back to public endpoints.

3. Run the development server

```bash
npm run dev
```

4. Build for production

```bash
npm run build
npm run start
```

_Part of the Ultimate React Course_
