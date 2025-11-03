export default function ForecastCardSkeleton() {
  return (
    <div className="mt-6 mr-6 animate-pulse">
      <div className="h-8 bg-gray-700 rounded w-1/2 mb-2"></div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {[...Array(7)].map((_, i) => (
          <div key={i} className="bg-gray-700 rounded-lg p-4 shadow">
            <div className="h-6 bg-gray-600 rounded w-3/4 mx-auto mb-4"></div>
            <div className="h-12 w-12 bg-gray-600 rounded-full mx-auto mb-4"></div>
            <div className="flex justify-between w-full">
              <div className="h-6 bg-gray-600 rounded w-1/4"></div>
              <div className="h-6 bg-gray-600 rounded w-1/4"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
