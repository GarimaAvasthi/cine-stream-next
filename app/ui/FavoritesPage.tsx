"use client";

import { useState } from "react";
import { useFavorites } from "../../src/context/useFavorites";
import MovieGrid from "../../src/components/MovieGrid";
import MovieDetailsModal from "../../src/components/MovieDetailsModal";

const FavoritesPage = () => {
  const { favorites } = useFavorites();
  const [selectedMovieId, setSelectedMovieId] = useState<string | null>(null);

  return (
    <section className="page">
      <header className="page-header">
        <p className="eyebrow">Saved List</p>
        <h2>My Favorites</h2>
      </header>
      <MovieGrid
        movies={favorites}
        onMovieClick={(movieId: string) => setSelectedMovieId(movieId)}
      />
      {selectedMovieId && (
        <MovieDetailsModal
          movieId={selectedMovieId}
          onClose={() => setSelectedMovieId(null)}
        />
      )}
    </section>
  );
};

export default FavoritesPage;

