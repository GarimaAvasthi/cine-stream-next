"use client";

import { useEffect, useState } from "react";
import { FavoritesContext, type FavoriteMovie } from "./favoritesStore";

const FAVORITES_LIMIT = 20;

export const FavoritesProvider = ({ children }: { children: React.ReactNode }) => {
  const [favorites, setFavorites] = useState<FavoriteMovie[]>(() => {
    if (typeof window === "undefined") return [];
    const stored = localStorage.getItem("favorites");
    return stored ? (JSON.parse(stored) as FavoriteMovie[]) : [];
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (movie: FavoriteMovie) => {
    const exists = favorites.some((m) => m.imdbID === movie.imdbID);

    if (exists) {
      setFavorites((prev) => prev.filter((m) => m.imdbID !== movie.imdbID));
      return { ok: true };
    }

    if (favorites.length >= FAVORITES_LIMIT) {
      return { ok: false, reason: "limit_reached" };
    }

    setFavorites((prev) => [...prev, movie]);
    return { ok: true };
  };

  const isFavorite = (id: string) => favorites.some((movie) => movie.imdbID === id);

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        toggleFavorite,
        isFavorite,
        favoritesLimit: FAVORITES_LIMIT,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

