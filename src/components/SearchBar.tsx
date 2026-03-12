"use client";

const SearchBar = ({
  query,
  onQueryChange,
}: {
  query: string;
  onQueryChange: (value: string) => void;
}) => {
  return (
    <div className="search-wrap">
      <input
        className="search-bar"
        type="text"
        placeholder="Search movies, series, or actors..."
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;

