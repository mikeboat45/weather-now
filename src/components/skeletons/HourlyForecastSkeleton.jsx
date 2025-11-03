export default function HourlyForecastSkeleton() {
  return (
    <div className="bg-gray-800 p-4 rounded-xl shadow-md mt-2 ml-2 animate-pulse">
      <div className="h-8 bg-gray-700 rounded w-1/2 mb-4"></div>
      <div className="flex flex-col gap-4">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="flex justify-between items-center bg-gray-700 p-2 rounded-lg border border-gray-600">
            <div className="h-6 bg-gray-600 rounded w-1/4"></div>
            <div className="h-6 bg-gray-600 rounded w-1/4"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
