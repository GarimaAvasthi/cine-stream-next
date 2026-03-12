"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type MovieDetails = {
  Response: "True" | "False";
  Error?: string;
  Title?: string;
  Poster?: string;
  Plot?: string;
  Genre?: string;
  Runtime?: string;
  imdbRating?: string;
};

const MovieDetailsModal = ({
  movieId,
  onClose,
}: {
  movieId: string;
  onClose: () => void;
}) => {
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`/api/tmdb/movie/${movieId}`);
        const data: MovieDetails = await res.json();
        if (cancelled) return;

        if (!data || data.Response === "False") {
          setError(data?.Error || "Movie details could not be loaded.");
          setMovie(null);
          return;
        }

        setMovie(data);
      } catch {
        if (!cancelled) setError("Movie details could not be loaded.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [movieId]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(event) => event.stopPropagation()}>
        <button className="close-btn" type="button" onClick={onClose}>
          {"\u2715"}
        </button>

        {loading && <p className="status-text">Loading movie details...</p>}
        {error && <p className="status-text error-text">{error}</p>}

        {!loading && !error && movie && (
          <>
            <h1>{movie.Title}</h1>
            <p className="rating-line">⭐ {movie.imdbRating} TMDB</p>

            <div className="modal-flex">
              {movie.Poster && movie.Poster !== "N/A" ? (
                <Image
                  src={movie.Poster}
                  alt={movie.Title || "Movie poster"}
                  width={300}
                  height={450}
                />
              ) : null}

              <div className="movie-meta">
                <p className="movie-plot">{movie.Plot}</p>
                <p>
                  <b>Genre:</b> {movie.Genre}
                </p>
                <p>
                  <b>Runtime:</b> {movie.Runtime}
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MovieDetailsModal;

