import { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import CurrentWeather from "../components/CurrentWeather";
import ForecastCard from "../components/ForecastCard";
import HourlyForecast from "../components/HourlyForecast";
import Unit from "../components/UnitDropDown";
import {
  getWeatherByCity,
  getWeatherByCoordinates,
} from "../services/weatherAPI";
import CurrentWeatherSkeleton from "../components/skeletons/CurrentWeatherSkeleton";
import ForecastCardSkeleton from "../components/skeletons/ForecastCardSkeleton";
import HourlyForecastSkeleton from "../components/skeletons/HourlyForecastSkeleton";
import SavedLocations from "../components/SavedLocations";

export default function Home() {
  const [weather, setWeather] = useState(null);
  const [unit, setUnit] = useState("metric");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [lastCity, setLastCity] = useState("");
  const [savedLocations, setSavedLocations] = useState([]);

  useEffect(() => {
    const storedLocations = JSON.parse(localStorage.getItem("savedLocations"));
    if (storedLocations) {
      setSavedLocations(storedLocations);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("savedLocations", JSON.stringify(savedLocations));
  }, [savedLocations]);

  async function handleSearch(city) {
    setLoading(true);
    setError("");
    setWeather(null);
    setLastCity(city);
    try {
      const data = await getWeatherByCity(city, unit);
      setWeather(data);
    } catch (err) {
      setError(err.message || "Unable to fetch weather data");
    } finally {
      setLoading(false);
    }
  }

  async function handleGeolocation() {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    setLoading(true);
    setError("");
    setWeather(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const data = await getWeatherByCoordinates(latitude, longitude, unit);
          setWeather(data);
          setLastCity(data.city);
        } catch (err) {
          setError(err.message || "Unable to fetch weather data");
        } finally {
          setLoading(false);
        }
      },
      () => {
        setError("Unable to retrieve your location.");
        setLoading(false);
      }
    );
  }

  function handleSaveLocation() {
    if (weather && !savedLocations.includes(weather.city)) {
      setSavedLocations([...savedLocations, weather.city]);
    }
  }

  function handleRemoveLocation(city) {
    setSavedLocations(savedLocations.filter((loc) => loc !== city));
  }

  useEffect(() => {
    if (lastCity) {
      handleSearch(lastCity);
    }
  }, [unit]);

  return (
    <div className="bg-violet-950 px-8 py-4 min-h-screen">
      <header className="flex items-center justify-between py-2">
        <img src="./assets/logo.svg" alt="App logo" className="w-auto h-8 sm:h-10" />
        <Unit unit={unit} onChange={setUnit} />
      </header>

      <main>
        <p className="text-center text-3xl text-white font-bold mb-4">
          How is the sky looking today?
        </p>

        <SearchBar onSearch={handleSearch} onGeolocation={handleGeolocation} />

        {savedLocations.length > 0 && (
          <SavedLocations
            locations={savedLocations}
            onSelect={handleSearch}
            onRemove={handleRemoveLocation}
          />
        )}

        {loading && (
          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-[3fr_1.5fr] md:gap-[0.5fr]">
            <div>
              <CurrentWeatherSkeleton />
              <ForecastCardSkeleton />
            </div>
            <div>
              <HourlyForecastSkeleton />
            </div>
          </div>
        )}
        {error && <p className="text-red-400 text-center mt-4">{error}</p>}

        {weather && (
          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-[3fr_1.5fr] md:gap-[0.5fr]">
            <div>
              <CurrentWeather
                city={weather.city}
                country={weather.country}
                data={weather.current}
                unit={unit}
                onSave={handleSaveLocation}
              />
              <ForecastCard data={weather.daily} />
            </div>
            <div>
              <HourlyForecast data={weather.hourly} />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
