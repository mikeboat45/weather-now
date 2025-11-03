import { fetchWeatherApi } from "openmeteo";

/**
 * Fetch coordinates for a given city using Open-Meteo Geocoding API
 */
export async function getCoordinates(city) {
  try {
    const response = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
        city
      )}&count=1`
    );
    if (!response.ok) throw new Error("Failed to fetch city coordinates");

    const data = await response.json();
    if (!data.results || data.results.length === 0)
      throw new Error("City not found");

    const { latitude, longitude, name, country } = data.results[0];
    return { latitude, longitude, name, country };
  } catch (error) {
    console.error("Geocoding error:", error);
    throw error;
  }
}

/**
 * Fetch and process weather data using Open-Meteo SDK
 */
export async function getWeatherData(latitude, longitude, unit = "metric") {
  try {
    const isMetric = unit === "metric";

    const params = {
      latitude,
      longitude,
      current: [
        "temperature_2m",
        "apparent_temperature",
        "precipitation",
        "wind_speed_10m",
        "relative_humidity_2m",
        "weathercode",
      ],
      hourly: [
        "temperature_2m",
        "precipitation",
        "relative_humidity_2m",
        "wind_speed_10m",
        "weathercode",
      ],
      daily: [
        "temperature_2m_max",
        "temperature_2m_min",
        "weathercode",
        "precipitation_sum",
      ],
      timezone: "auto",
      temperature_unit: isMetric ? "celsius" : "fahrenheit",
      wind_speed_unit: isMetric ? "kmh" : "mph",
      precipitation_unit: isMetric ? "mm" : "inch",
    };

    const url = "https://api.open-meteo.com/v1/forecast";
    const responses = await fetchWeatherApi(url, params);
    const response = responses[0];

    const utcOffsetSeconds = response.utcOffsetSeconds();
    const current = response.current();
    const hourly = response.hourly();
    const daily = response.daily();

    // 🕒 Hourly Data
    const hourlyData = {
      time: Array.from(
        {
          length:
            (Number(hourly.timeEnd()) - Number(hourly.time())) /
            hourly.interval(),
        },
        (_, i) =>
          new Date(
            (Number(hourly.time()) + i * hourly.interval() + utcOffsetSeconds) *
              1000
          )
      ),
      temperature_2m: hourly.variables(0).valuesArray(),
      precipitation: hourly.variables(1).valuesArray(),
      humidity: hourly.variables(2).valuesArray(),
      wind_speed: hourly.variables(3).valuesArray(),
      weathercode: hourly.variables(4).valuesArray(),
    };

    // 📅 Daily Data
    const dailyData = {
      time: Array.from(
        {
          length:
            (Number(daily.timeEnd()) - Number(daily.time())) / daily.interval(),
        },
        (_, i) =>
          new Date(
            (Number(daily.time()) + i * daily.interval() + utcOffsetSeconds) *
              1000
          )
      ),
      temp_max: daily.variables(0).valuesArray(),
      temp_min: daily.variables(1).valuesArray(),
      weathercode: daily.variables(2).valuesArray(),
      precipitation_sum: daily.variables(3).valuesArray(),
    };

    // 🌡️ Current Data
    const currentData = {
      temperature: current.variables(0).value(),
      apparent_temperature: current.variables(1).value(),
      precipitation: current.variables(2).value(),
      wind_speed: current.variables(3).value(),
      humidity: current.variables(4).value(),
      weathercode: current.variables(5).value(),
    };

    return { current: currentData, hourly: hourlyData, daily: dailyData };
  } catch (error) {
    console.error("Weather fetch error:", error);
    throw error;
  }
}

/**
 * Helper: Get weather by city name
 */
export async function getWeatherByCity(city, unit = "metric") {
  try {
    const { latitude, longitude, name, country } = await getCoordinates(city);
    const weatherData = await getWeatherData(latitude, longitude, unit);
    return { city: name, country, ...weatherData };
  } catch (error) {
    console.error("Error fetching weather for city:", error);
    throw error;
  }
}

/**
 * Fetch city and country name from coordinates using BigDataCloud API
 */
export async function getCityName(latitude, longitude) {
  try {
    const response = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
    );
    if (!response.ok) throw new Error("Failed to fetch city name");

    const data = await response.json();
    return { city: data.city, country: data.countryName };
  } catch (error) {
    console.error("Reverse geocoding error:", error);
    throw error;
  }
}

/**
 * Helper: Get weather by coordinates
 */
export async function getWeatherByCoordinates(latitude, longitude, unit = "metric") {
  try {
    const { city, country } = await getCityName(latitude, longitude);
    const weatherData = await getWeatherData(latitude, longitude, unit);
    return { city, country, ...weatherData };
  } catch (error) {
    console.error("Error fetching weather for coordinates:", error);
    throw error;
  }
}
