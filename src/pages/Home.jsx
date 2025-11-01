// import Unit from "../components/UnitDropDown";
import SearchBar from "../components/SearchBar";
// import CurrentWeather from "../components/CurrentWeather";
// import ForecastCard from "../components/ForecastCard";
// import HourlyForecast from "../components/HourlyForecast";

export function Home() {
  return (
    <div className="bg-violet-950">
      <header className="flex items-center justify-around py-2">
        <img src="./assets/logo.svg" alt="image of app-logo" />

        {/* <Unit /> */}
      </header>
      <main>
        <p className="text-center text-3xl text-white font-bold">
          How is the sky looking today?
        </p>
        <SearchBar />
        <div>
          {/* <div>
            <CurrentWeather />
            <ForecastCard />
          </div>
          <HourlyForecast /> */}
        </div>
      </main>
    </div>
  );
}

export default Home;
