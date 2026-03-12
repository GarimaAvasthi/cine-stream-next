"use client";

import MovieCard from "./MovieCard";
import { sortMissingPostersLast } from "../utils/poster";

type Movie = {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
};

const MovieGrid = ({
  movies,
  onMovieClick,
}: {
  movies: Movie[];
  onMovieClick?: (movieId: string) => void;
}) => {
  const orderedMovies = sortMissingPostersLast(movies);

  if (!orderedMovies.length) {
    return (
      <div className="empty-state">
        <h3>No movies found</h3>
        <p>Try a different title, genre, or keyword.</p>
      </div>
    );
  }

  return (
    <div className="movie-grid">
      {orderedMovies.map((movie) => (
        <MovieCard key={movie.imdbID} movie={movie} onClick={onMovieClick} />
      ))}
    </div>
  );
};

export default MovieGrid;

