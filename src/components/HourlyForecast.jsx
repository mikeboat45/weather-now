// src/components/HourlyForecast.jsx
import { useState, useMemo, useRef, useEffect } from "react";
import { weatherCodeToIcon } from "../utils/weatherUtils.js";

export default function HourlyForecast({ data }) {
  const [selectedDay, setSelectedDay] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const scrollContainerRef = useRef(null);
  const currentHourRef = useRef(null);

  const dailyData = useMemo(() => {
    const days = [];
    data.time.forEach((time, i) => {
      const day = time.toLocaleDateString("en-US", { weekday: "long" });
      if (!days.find((d) => d.day === day)) {
        days.push({ day, hourly: [] });
      }
      days[days.length - 1].hourly.push({
        time: new Date(time),
        temp: data.temperature_2m[i],
        weathercode: data.weathercode[i],
      });
    });
    return days;
  }, [data]);

  const todayHours = dailyData[selectedDay]?.hourly.slice(0, 24) || [];

  useEffect(() => {
    if (currentHourRef.current) {
      currentHourRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [selectedDay]);

  return (
    <div className="bg-gray-800 text-white p-4 rounded-xl shadow-md lg:mt-2 lg:ml-2">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-bold">Hourly Forecast</h3>
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 text-sm font-medium"
          >
            <span>{dailyData[selectedDay]?.day}</span>
            <img
              src="./assets/icon-dropdown.svg"
              alt="dropdown arrow"
              className={`transform transition-transform ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </button>
          {isOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-xl z-10">
              {dailyData.map((day, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setSelectedDay(i);
                    setIsOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  {day.day}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      <div
        ref={scrollContainerRef}
        className="flex flex-col gap-4 h-120 overflow-y-auto"
      >
        {todayHours.map((hour, i) => {
          const isCurrentHour =
            new Date().getHours() === hour.time.getHours() && selectedDay === 0;
          return (
            <div
              key={i}
              ref={isCurrentHour ? currentHourRef : null}
              className="flex justify-between items-center bg-gray-700 p-2 rounded-lg border border-gray-600"
            >
              <div className="flex items-center gap-2">
                <img
                  src={weatherCodeToIcon(hour.weathercode)}
                  alt="weather icon"
                  className="w-6 h-6"
                />
                <p className="text-sm text-gray-300">
                  {hour.time.toLocaleTimeString("en-US", {
                    hour: "numeric",
                    hour12: true,
                  })}
                </p>
              </div>
              <p className="text-lg font-semibold">{hour.temp.toFixed(1)}°</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
