"use client";

import Image from "next/image";
import { useState } from "react";
import { useDebounce } from "../../src/hooks/useDebounce";
import { useInfiniteScroll } from "../../src/hooks/useInfiniteScroll";
import { useMovies } from "../../src/hooks/useMovies";
import { useFavorites } from "../../src/context/useFavorites";
import MovieGrid from "../../src/components/MovieGrid";
import SearchBar from "../../src/components/SearchBar";
import MovieDetailsModal from "../../src/components/MovieDetailsModal";
import {
  handlePosterError,
  resolvePosterUrl,
  sortMissingPostersLast,
} from "../../src/utils/poster";

import type { MovieListItem } from "../lib/tmdb";

type HomePageProps = {
  initialPopularMovies: MovieListItem[];
};

const HomePage = ({ initialPopularMovies }: HomePageProps) => {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [selectedMovieId, setSelectedMovieId] = useState<string | null>(null);
  const { favorites } = useFavorites();
  const debouncedQuery = useDebounce(query, 500);

  const { movies, loading, error, hasMore } = useMovies(debouncedQuery, page);

  const handleQueryChange = (value: string) => {
    setQuery(value);
    setPage(1);
  };

  useInfiniteScroll(() => {
    if (!hasMore) return;
    setPage((prev) => prev + 1);
  }, loading);

  const hasQuery = Boolean(debouncedQuery.trim());
  const topFiveMovies = sortMissingPostersLast(initialPopularMovies).slice(
    0,
    5
  );

  return (
    <section className="page home-page">
      <section className="home-controls">
        <article className="panel-card search-panel">
          <div className="panel-head">
            <h3>Search Movies</h3>
            <span suppressHydrationWarning>{favorites.length} favorites</span>
          </div>
          <SearchBar query={query} onQueryChange={handleQueryChange} />
        </article>

        <article className="panel-card top-panel">
          <div className="panel-head">
            <h3>Popular Picks</h3>
          </div>
          <div className="top-list" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
            {topFiveMovies.length ? (
              topFiveMovies.map((movie, index: number) => (
                <button
                  key={movie.imdbID}
                  type="button"
                  className="top-item"
                  onClick={() => setSelectedMovieId(movie.imdbID)}
                >
                  <span>{index + 1}</span>
                  <Image
                    src={resolvePosterUrl(movie.Poster)}
                    alt={movie.Title}
                    width={80}
                    height={110}
                    onError={handlePosterError}
                  />
                  <p>{movie.Title}</p>
                </button>
              ))
            ) : (
              <p className="status-text">No popular picks available right now.</p>
            )}
          </div>
        </article>
      </section>

      <div className="results-head">
        <h3>
          {hasQuery
            ? `Results for "${debouncedQuery}"`
            : "Popular picks"}
        </h3>
      </div>
      {error && <p className="status-text error-text">{error}</p>}
      <MovieGrid
        movies={movies}
        onMovieClick={(movieId: string) => setSelectedMovieId(movieId)}
      />
      {loading && <p className="status-text">Loading more titles...</p>}
      {selectedMovieId && (
        <MovieDetailsModal
          movieId={selectedMovieId}
          onClose={() => setSelectedMovieId(null)}
        />
      )}
    </section>
  );
};

export default HomePage;

