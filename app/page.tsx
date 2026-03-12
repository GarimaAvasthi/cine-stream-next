import Home from "./ui/HomePage";
import { fetchPopularMovies } from "./lib/tmdb";

export const dynamic = "force-dynamic";

export default async function RootPage() {
  const popularMovies = await fetchPopularMovies(5);
  return <Home initialPopularMovies={popularMovies} />;
}

