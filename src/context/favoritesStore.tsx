"use client";

import { createContext } from "react";

export type FavoriteMovie = {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
};

export type FavoritesContextValue = {
  favorites: FavoriteMovie[];
  toggleFavorite: (movie: FavoriteMovie) => { ok: boolean; reason?: string };
  isFavorite: (id: string) => boolean;
  favoritesLimit: number;
};

export const FavoritesContext = createContext<FavoritesContextValue | null>(
  null
);

