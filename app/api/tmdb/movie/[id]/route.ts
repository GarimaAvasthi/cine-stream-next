import { NextResponse } from "next/server";

const API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = process.env.TMDB_BASE_URL || "https://api.themoviedb.org/3";
const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

const buildPoster = (posterPath: string | null | undefined) =>
  posterPath ? `${IMAGE_BASE}${posterPath}` : "N/A";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!API_KEY) {
    return NextResponse.json({
      Response: "False",
      Error: "Missing TMDB_API_KEY in .env.local",
    });
  }

  const { id } = await params;

  const url = new URL(`${BASE_URL}/movie/${id}`);
  url.searchParams.set("api_key", API_KEY);

  try {
    const res = await fetch(url.toString(), { cache: "no-store" });
    if (!res.ok) {
      return NextResponse.json({
        Response: "False",
        Error: `TMDB request failed (${res.status})`,
      });
    }

    const data: {
      id: number;
      title: string;
      overview?: string | null;
      poster_path?: string | null;
      genres?: Array<{ name: string }>;
      runtime?: number | null;
      vote_average?: number | null;
    } = await res.json();

    const genres =
      data?.genres?.map((genre) => genre.name).join(", ") || "Genre not listed";

    return NextResponse.json({
      Response: "True",
      Title: data.title,
      imdbID: String(data.id),
      Poster: buildPoster(data.poster_path),
      Plot: data.overview || "Plot not available.",
      Genre: genres,
      Runtime: data.runtime ? `${data.runtime} min` : "Runtime N/A",
      imdbRating:
        typeof data.vote_average === "number"
          ? data.vote_average.toFixed(1)
          : "N/A",
    });
  } catch {
    return NextResponse.json({
      Response: "False",
      Error: "Unable to reach TMDB. Please check your connection.",
    });
  }
}
