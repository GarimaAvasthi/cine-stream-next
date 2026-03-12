## Cine-Stream (Next.js 15 + App Router)

Cine-Stream is a movie discovery app upgraded from a Vite SPA to **Next.js 15 (App Router)** with **SSR**, **Server Components**, and **SEO-friendly dynamic routes**.

## Vercel Application 


# Key features:

- Popular movies loaded on the **server** from the TMDB API.
- Client-side search with debounced input and infinite scroll.
- Favorites list persisted in `localStorage`.
- Dynamic route `/movie/[id]` with SSR and dynamic `<title>` / `<meta>` via `generateMetadata`.

# Tech Stack

- React 19 
- Tailwind CSS 4.0
- TMDB API 
- Fetch API
- React Context API
- ESLint 
- Next.js 15+ (App Router) 
- Node.js 

# GitHub Setup

If you haven't initialized your repository yet, follow these steps:

1. **Initialize Git**:
   ```bash
   git init
   ```

2. **Add Files**:
   ```bash
   git add .
   ```

3. **Commit Changes**:
   ```bash
   git commit -m "Initial commit: Cine-Stream Next.js 15 Port"
   ```

4. **Add Remote & Push**:
   Go to GitHub, create a new repository, and then run:
   ```bash
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/cine-stream-next.git
   git push -u origin main
   ```

# Run Locally

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

## Project Structure

```text
cine-stream-next/
├── app/
│   ├── api/            
│   ├── components/      
│   ├── favorites/ 
│   ├── lib/             
│   ├── movie/      
│   │   └── [id]/        
│   ├── providers/       
│   ├── ui/              
│   ├── globals.css
│   └── layout.tsx    
├── public/             
├── src/                 
│   ├── components/      
│   ├── context/         
│   ├── hooks/          
│   └── utils/           
├── prompts.md           
└── package.json         
```

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

