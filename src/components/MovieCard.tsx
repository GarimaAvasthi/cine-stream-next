"use client";

import Image from "next/image";
import { useFavorites } from "../context/useFavorites";
import { handlePosterError, resolvePosterUrl } from "../utils/poster";

type Movie = {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
};

const MovieCard = ({
  movie,
  onClick,
}: {
  movie: Movie;
  onClick?: (movieId: string) => void;
}) => {
  const { toggleFavorite, isFavorite, favoritesLimit } = useFavorites();
  const favorite = isFavorite(movie.imdbID);

  const handleFavoriteClick = () => {
    const result = toggleFavorite(movie);
    if (result?.ok === false && result.reason === "limit_reached") {
      alert(`You can add up to ${favoritesLimit} movies to favorites.`);
    }
  };

  return (
    <div className="movie-card">
      <button
        className="poster-btn"
        type="button"
        onClick={() => onClick?.(movie.imdbID)}
        aria-label={`Open details for ${movie.Title}`}
      >
        <Image
          className="movie-poster"
          src={resolvePosterUrl(movie.Poster)}
          alt={movie.Title}
          width={300}
          height={450}
          onError={handlePosterError}
        />
      </button>

      <div className="card-overlay">
        <div className="movie-copy">
          <h3>{movie.Title}</h3>
          <p>{movie.Year}</p>
        </div>
        <button
          className={`heart ${favorite ? "active" : ""}`}
          type="button"
          onClick={handleFavoriteClick}
          aria-label={
            favorite
              ? `Remove ${movie.Title} from favorites`
              : `Add ${movie.Title} to favorites`
          }
        >
          {"\u2665"}
        </button>
      </div>
    </div>
  );
};

export default MovieCard;

