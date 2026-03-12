"use client";

import { useEffect, useReducer } from "react";
import { sortMissingPostersLast } from "../utils/poster";

type MovieListItem = {
  Title: string;
  Year: string;
  Poster: string;
  imdbID: string;
};

type MoviesState = {
  movies: MovieListItem[];
  loading: boolean;
  error: string;
  hasMore: boolean;
  totalPages: number;
};

const initialState: MoviesState = {
  movies: [],
  loading: false,
  error: "",
  hasMore: true,
  totalPages: 1,
};

type Action =
  | { type: "FETCH_START"; reset: boolean }
  | {
      type: "FETCH_SUCCESS";
      reset: boolean;
      movies: MovieListItem[];
      totalPages: number;
      page: number;
    }
  | { type: "FETCH_ERROR"; error: string };

const moviesReducer = (state: MoviesState, action: Action): MoviesState => {
  switch (action.type) {
    case "FETCH_START":
      return {
        ...state,
        loading: true,
        error: "",
        movies: action.reset ? [] : state.movies,
      };
    case "FETCH_SUCCESS": {
      const incomingMovies = action.movies ?? [];
      const combinedMovies = action.reset
        ? incomingMovies
        : [
            ...state.movies,
            ...incomingMovies.filter(
              (movie) =>
                !state.movies.some((existing) => existing.imdbID === movie.imdbID)
            ),
          ];

      return {
        ...state,
        loading: false,
        movies: sortMissingPostersLast(combinedMovies),
        totalPages: action.totalPages ?? state.totalPages,
        hasMore:
          incomingMovies.length > 0 &&
          action.page < (action.totalPages ?? Number.POSITIVE_INFINITY),
      };
    }
    case "FETCH_ERROR":
      return {
        ...state,
        loading: false,
        error: action.error,
        hasMore: false,
      };
    default:
      return state;
  }
};

export const useMovies = (query: string, page = 1) => {
  const [state, dispatch] = useReducer(moviesReducer, initialState);
  const searchTerm = (query || "marvel").trim() || "marvel";

  useEffect(() => {
    let cancelled = false;
    const resetList = page === 1;

    const loadMovies = async () => {
      dispatch({ type: "FETCH_START", reset: resetList });
      try {
        const url = new URL("/api/tmdb/search", window.location.origin);
        url.searchParams.set("q", searchTerm);
        url.searchParams.set("page", String(page));

        const res = await fetch(url.toString());
        const data: {
          Response: "True" | "False";
          Search?: MovieListItem[];
          Error?: string;
          totalPages?: number;
        } = await res.json();

        if (cancelled) return;

        const apiMovies = data?.Search ?? [];
        const shouldShowError =
          data?.Response === "False" && page === 1 && data?.Error !== "Movie not found!";

        dispatch({
          type: "FETCH_SUCCESS",
          reset: resetList,
          movies: apiMovies,
          totalPages: data?.totalPages ?? 1,
          page,
        });

        if (shouldShowError) {
          dispatch({
            type: "FETCH_ERROR",
            error: data.Error || "Unable to fetch movies right now.",
          });
        }
      } catch {
        if (cancelled) return;
        dispatch({
          type: "FETCH_ERROR",
          error: "Unable to fetch movies right now.",
        });
      }
    };

    loadMovies();
    return () => {
      cancelled = true;
    };
  }, [searchTerm, page]);

  return state;
};

