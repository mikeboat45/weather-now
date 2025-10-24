import Unit from "../components/UnitDropDown";
import SearchBar from "../components/SearchBar";
import CurrentWeather from "../components/CurrentWeather";
import ForecastCard from "../components/ForecastCard";
import HourlyForecast from "../components/HourlyForecast";

export function Home() {
  return (
    <>
      <header>
        <div>
          <img src="" alt="" />
          <span>Hey Weather</span>
          <Unit />
        </div>
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
