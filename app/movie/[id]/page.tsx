import type { Metadata } from "next";
import { fetchMovieDetailsServer } from "../../lib/tmdb";

type PageProps = {
  params: Promise<{ id: string }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const movie = await fetchMovieDetailsServer(id);

  if (!movie) {
    return {
      title: "Movie not found - Cine-Stream",
      description:
        "The requested movie could not be found in the Cine-Stream catalog.",
    };
  }

  return {
    title: `${movie.title} - Cine-Stream`,
    description: movie.overview,
  };
}

export default async function MoviePage({ params }: PageProps) {
  const { id } = await params;
  const movie = await fetchMovieDetailsServer(id);

  if (!movie) {
    return (
      <section className="page">
        <header className="page-header">
          <p className="eyebrow">Movie</p>
          <h2>Movie not found</h2>
        </header>
        <p className="status-text">
          We couldn&apos;t find details for this title. It might have been
          removed or is temporarily unavailable.
        </p>
      </section>
    );
  }

  return (
    <section className="page">
      <header className="page-header">
        <p className="eyebrow">Movie</p>
        <h2>{movie.title}</h2>
      </header>
      <p className="rating-line">⭐ {movie.voteAverage} TMDB</p>
      <p className="movie-plot">{movie.overview}</p>
      <p>
        <b>Genre:</b> {movie.genres}
      </p>
      <p>
        <b>Runtime:</b> {movie.runtime}
      </p>
    </section>
  );
}

