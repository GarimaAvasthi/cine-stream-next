## Cine-Stream (Next.js 15 + App Router)

Cine-Stream is a movie discovery app upgraded from a Vite SPA to **Next.js 15 (App Router)** with **SSR**, **Server Components**, and **SEO-friendly dynamic routes**.

Key features:

- Popular movies loaded on the **server** from the TMDB API.
- Client-side search with debounced input and infinite scroll.
- Favorites list persisted in `localStorage`.
- Dynamic route `/movie/[id]` with SSR and dynamic `<title>` / `<meta>` via `generateMetadata`.

## Getting Started

First, install dependencies and run the development server:

```bash
npm install
npm run dev
```

Then open `http://localhost:3000` in your browser.

## Environment variables

Create `.env.local` in `cine-stream-next/`:

```env
TMDB_API_KEY=your_tmdb_v3_key
TMDB_BASE_URL=https://api.themoviedb.org/3
```

## Routes

- `/` and `/home` – main movie search UI alongside a dynamic, horizontally expanded "Popular Picks" grid (client UI + server-fetched popular list).
- `/favorites` – favorites grid using client context.
- `/movie/[id]` – dynamic SSR movie details + SEO metadata.

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

