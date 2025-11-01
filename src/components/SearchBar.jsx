export default function SearchBar() {
  return (
    <form className="text-center text-lg py-8">
      <label htmlFor="search-input"></label>
      <input
        type="search"
        id="search-input"
        name="q"
        placeholder="Search for a place ..."
        className="rounded-lg bg-gray-800 opacity-85 p-1 px-4 mr-6 text-white"
      />
      <button
        type="submit"
        className="text-white bg-violet-500 p-1 px-4 rounded-lg"
      >
        Search
      </button>
    </form>
  );
}
