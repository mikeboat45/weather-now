export default function CurrentWeatherSkeleton() {
  return (
    <>
      <div className="bg-gray-800 rounded-xl p-8 py-16 shadow-md mt-4 mr-6 animate-pulse">
        <div className="h-8 bg-gray-700 rounded w-3/4 mb-4"></div>
        <div className="h-6 bg-gray-700 rounded w-1/2 mb-4"></div>
        <div className="h-16 bg-gray-700 rounded w-1/4"></div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 mr-6">
        <div className="bg-gray-700 p-6 rounded-lg animate-pulse">
          <div className="h-6 bg-gray-600 rounded w-3/4 mb-4"></div>
          <div className="h-10 bg-gray-600 rounded w-1/2"></div>
        </div>
        <div className="bg-gray-700 p-6 rounded-lg animate-pulse">
          <div className="h-6 bg-gray-600 rounded w-3/4 mb-4"></div>
          <div className="h-10 bg-gray-600 rounded w-1/2"></div>
        </div>
        <div className="bg-gray-700 p-6 rounded-lg animate-pulse">
          <div className="h-6 bg-gray-600 rounded w-3/4 mb-4"></div>
          <div className="h-10 bg-gray-600 rounded w-1/2"></div>
        </div>
        <div className="bg-gray-700 p-6 rounded-lg animate-pulse">
          <div className="h-6 bg-gray-600 rounded w-3/4 mb-4"></div>
          <div className="h-10 bg-gray-600 rounded w-1/2"></div>
        </div>
      </div>
    </>
  );
}
