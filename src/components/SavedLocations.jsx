export default function SavedLocations({ locations, onSelect, onRemove }) {
  return (
    <div className="mt-4 text-center">
      <h3 className="text-lg font-semibold text-white mb-2">Saved Locations</h3>
      <div className="flex flex-wrap justify-center gap-2">
        {locations.map((location) => (
          <div key={location} className="flex items-center bg-gray-700 text-white rounded-lg p-2">
            <button onClick={() => onSelect(location)} className="hover:underline">
              {location}
            </button>
            <button onClick={() => onRemove(location)} className="ml-2 text-red-500 hover:text-red-700">
              &times;
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
