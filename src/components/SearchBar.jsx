import { useState } from "react";

export default function SearchBar({ onSearch, onGeolocation }) {
  const [query, setQuery] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (query) onSearch(query);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-wrap justify-center items-center gap-2 py-4"
    >
      <label htmlFor="search-input" className="sr-only">
        Search for a place
      </label>
      <input
        type="search"
        id="search-input"
        name="q"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a place ..."
        className="rounded-lg bg-gray-800 opacity-85 p-1 px-4 text-white grow max-w-xs"
      />
      <button
        type="submit"
        className="text-white bg-white/10 p-1 px-4 rounded-lg"
      >
        Search
      </button>
      {/* Using retry icon as a placeholder for location icon */}
      <button
        type="button"
        onClick={onGeolocation}
        className="text-white bg-gray-500 p-1 px-4 rounded-lg"
        aria-label="Get current location weather"
      >
        <img
          src="./assets/icon-retry.svg"
          alt="geolocation icon"
          className="w-6 h-6"
        />
      </button>
    </form>
  );
}
