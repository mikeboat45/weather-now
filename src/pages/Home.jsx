import Unit from "../components/UnitDropDown";
import SearchBar from "../components/SearchBar";
import CurrentWeather from "../components/CurrentWeather";
import ForecastCard from "../components/ForecastCard";
import HourlyForecast from "../components/HourlyForecast";

export function Home() {
  return (
    <>
      <header className="flex item-center justify-between">
        <div className="flex gap-2">
          <img src="./assets/logo.svg" alt="image of app-logo" />
          <span>Hey Weather</span>
        </div>
        <Unit />
      </header>
      <main>
        <p>How is the sky looking today?</p>
        <SearchBar />
        <div>
          <div>
            <CurrentWeather />
            <ForecastCard />
          </div>
          <HourlyForecast />
        </div>
      </main>
    </>
  );
}

export default Home;
