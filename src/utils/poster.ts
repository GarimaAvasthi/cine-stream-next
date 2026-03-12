const posterFallbackSvg = "/poster-fallback.svg";

export const resolvePosterUrl = (poster: string | undefined) => {
  if (!poster || poster === "N/A") return posterFallbackSvg;
  return poster;
};

export const handlePosterError = (
  event: React.SyntheticEvent<HTMLImageElement>
) => {
  const target = event.currentTarget;
  if (target?.src && target.src.includes(posterFallbackSvg)) return;
  target.src = posterFallbackSvg;
};

export const sortMissingPostersLast = <T extends { Poster?: string }>(
  movies: T[] = []
) => {
  return [...movies].sort((a, b) => {
    const aMissing = !a?.Poster || a.Poster === "N/A";
    const bMissing = !b?.Poster || b.Poster === "N/A";
    if (aMissing === bMissing) return 0;
    return aMissing ? 1 : -1;
  });
};

