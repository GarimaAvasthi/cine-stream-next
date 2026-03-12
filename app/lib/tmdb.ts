const API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = process.env.TMDB_BASE_URL || "https://api.themoviedb.org/3";
const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

export type MovieListItem = {
  Title: string;
  Year: string;
  Poster: string;
  imdbID: string;
};

export type MovieDetails = {
  id: number;
  title: string;
  overview: string;
  genres: string;
  runtime: string;
  voteAverage: string;
};

const buildPoster = (posterPath: string | null | undefined) =>
  posterPath ? `${IMAGE_BASE}${posterPath}` : "N/A";

export async function fetchPopularMovies(limit = 5): Promise<MovieListItem[]> {
  if (!API_KEY) return [];

  const url = new URL(`${BASE_URL}/movie/popular`);
  url.searchParams.set("api_key", API_KEY);
  url.searchParams.set("language", "en-US");
  url.searchParams.set("page", "1");

  try {
    const res = await fetch(url.toString(), { cache: "no-store" });
    if (!res.ok) return [];

    const data: { results?: Array<{ id: number; title: string; release_date?: string | null; poster_path?: string | null }> } =
      await res.json();
    const results: MovieListItem[] = (data?.results ?? []).map((movie) => ({
      Title: movie.title,
      Year: movie.release_date ? movie.release_date.slice(0, 4) : "—",
      Poster: buildPoster(movie.poster_path),
      imdbID: String(movie.id),
    }));

    return results.slice(0, limit);
  } catch {
    return [];
  }
}

export async function fetchMovieDetailsServer(
  id: string
): Promise<MovieDetails | null> {
  if (!API_KEY) return null;

  const url = new URL(`${BASE_URL}/movie/${id}`);
  url.searchParams.set("api_key", API_KEY);
  url.searchParams.set("append_to_response", "credits");

  try {
    const res = await fetch(url.toString(), { cache: "no-store" });
    if (!res.ok) return null;

    const data: {
      id: number;
      title: string;
      overview?: string | null;
      runtime?: number | null;
      vote_average?: number | null;
      genres?: Array<{ name: string }>;
    } = await res.json();

    const genres =
      data?.genres?.map((genre) => genre.name).join(", ") || "Genre not listed";

    return {
      id: data.id,
      title: data.title,
      overview: data.overview || "Plot not available.",
      genres,
      runtime: data.runtime ? `${data.runtime} min` : "Runtime N/A",
      voteAverage:
        typeof data.vote_average === "number"
          ? data.vote_average.toFixed(1)
          : "N/A",
    };
  } catch {
    return null;
  }
}

