import { NextResponse } from "next/server";

const API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = process.env.TMDB_BASE_URL || "https://api.themoviedb.org/3";
const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

const buildPoster = (posterPath: string | null | undefined) =>
  posterPath ? `${IMAGE_BASE}${posterPath}` : "N/A";

export async function GET(request: Request) {
  if (!API_KEY) {
    return NextResponse.json({
      Response: "False",
      Error: "Missing TMDB_API_KEY in .env.local",
      Search: [],
      totalPages: 1,
    });
  }

  const { searchParams } = new URL(request.url);
  const q = (searchParams.get("q") || "").trim();
  const page = searchParams.get("page") || "1";

  if (!q) {
    return NextResponse.json({
      Response: "True",
      Search: [],
      totalPages: 1,
    });
  }

  const url = new URL(`${BASE_URL}/search/movie`);
  url.searchParams.set("api_key", API_KEY);
  url.searchParams.set("query", q);
  url.searchParams.set("page", page);
  url.searchParams.set("include_adult", "false");

  try {
    const res = await fetch(url.toString(), { cache: "no-store" });
    if (!res.ok) {
      return NextResponse.json({
        Response: "False",
        Error: `TMDB request failed (${res.status})`,
        Search: [],
        totalPages: 1,
      });
    }

    const data: {
      results?: Array<{
        id: number;
        title: string;
        release_date?: string | null;
        poster_path?: string | null;
      }>;
      total_pages?: number;
    } = await res.json();

    const results = (data?.results ?? []).map((movie) => ({
      Title: movie.title,
      Year: movie.release_date ? movie.release_date.slice(0, 4) : "—",
      Poster: buildPoster(movie.poster_path),
      imdbID: String(movie.id),
    }));

    return NextResponse.json({
      Response: "True",
      Search: results,
      totalPages: data?.total_pages ?? 1,
    });
  } catch {
    return NextResponse.json({
      Response: "False",
      Error: "Unable to reach TMDB. Please check your connection.",
      Search: [],
      totalPages: 1,
    });
  }
}

