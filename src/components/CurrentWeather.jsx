// src/components/CurrentWeather.jsx
import { weatherCodeToIcon } from "../utils/weatherUtils.js";

export default function CurrentWeather({ city, country, data, unit, onSave }) {
  const tempUnit = unit === "metric" ? "°C" : "°F";
  const speedUnit = unit === "metric" ? "km/h" : "mph";

  return (
    <>
      <div className="bg-gray-800 text-white rounded-xl p-6 py-12 sm:p-8 sm:py-16 shadow-md mt-2 mr-6 flex justify-between items-center">
        <div>
          <div className="flex items-center gap-2 sm:gap-4">
            <h2 className="text-xl sm:text-2xl font-bold mb-2">
              {city}, {country}
            </h2>
            <button
              onClick={onSave}
              className="text-yellow-500 hover:text-yellow-700"
              aria-label="Save current location"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 sm:h-6 sm:w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 5a2 2 0 012-2h10a2 2 0 012 2v1h2a1 1 0 011 1v13a1 1 0 01-1 1H4a1 1 0 01-1-1V7a1 1 0 011-1h2V5z"
                />
              </svg>
            </button>
          </div>
          <p className="text-base sm:text-lg text-gray-300">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          <img
            src={weatherCodeToIcon(data.weathercode)}
            alt="weather icon"
            className="w-16 h-16 sm:w-20 sm:h-20"
          />
          <p className="text-5xl sm:text-6xl font-semibold">
            {Math.round(data.temperature)} {tempUnit}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 mr-6">
        <div className="bg-gray-700 text-white p-6 rounded-lg">
          <p className="text-lg text-gray-300 font-semibold">Feels like</p>
          <p className="lg:text-4xl sm:text-2xl md:text-3xl font-bold sm:font-semibold">
            {Math.round(data.apparent_temperature)} {tempUnit}
          </p>
        </div>
        <div className="bg-gray-700 text-white p-6 rounded-lg">
          <p className="text-lg text-gray-300 font-semibold">Humidity</p>
          <p className="lg:text-4xl sm:text-2xl md:text-3xl font-bold sm:font-semibold">
            {data.humidity}%
          </p>
        </div>
        <div className="bg-gray-700 text-white p-6 rounded-lg">
          <p className="text-lg text-gray-300 font-semibold">Wind</p>
          <p className="lg:text-4xl sm:text-2xl md:text-3xl font-bold sm:font-semibold">
            {Math.round(data.wind_speed)} {speedUnit}
          </p>
        </div>
        <div className="bg-gray-700 text-white p-6 rounded-lg">
          <p className="text-lg text-gray-300 font-semibold">Precipitation</p>
          <p className="lg:text-4xl sm:text-2xl md:text-3xl font-bold sm:font-semibold">
            {Math.round(data.precipitation)} {unit === "metric" ? "mm" : "in"}
          </p>
        </div>
      </div>
    </>
  );
}
