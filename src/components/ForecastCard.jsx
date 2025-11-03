// src/components/ForecastCard.jsx
import { weatherCodeToIcon } from "../utils/weatherUtils.js";

export default function ForecastCard({ data }) {
  return (
    <div className="mt-6 mr-6">
      <p className="font-semibold text-xl text-white mb-2">Daily Forecast</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {data.time.map((day, i) => (
          <div
            key={i}
            className="bg-gray-700 text-white rounded-lg p-4 shadow hover:shadow-lg transition flex flex-col items-center"
          >
            <p className="font-semibold">
              {day.toLocaleDateString("en-US", { weekday: "short" })}
            </p>
            <img
              src={weatherCodeToIcon(data.weathercode[i])}
              alt="weather icon"
              className="w-12 h-12 my-2"
            />
            <div className="flex justify-between w-full">
              <p className="font-bold">{Math.round(data.temp_max[i])}°</p>
              <p className="text-gray-300">{Math.round(data.temp_min[i])}°</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
