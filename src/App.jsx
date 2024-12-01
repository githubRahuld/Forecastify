import React, { useEffect, useState } from "react";
import axios from "axios";
import SearchBar from "./components/SearchBar";
import WeatherDisplay from "./components/WeatherDisplay";
import FavoritesList from "./components/FavoritesList";
import { HiArrowCircleUp } from "react-icons/hi";

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [favorites, setFavorites] = useState([]);

  const API_KEY = import.meta.env.VITE_API_KEY;
  const WEATHER_API = import.meta.env.VITE_API_URL;

  const getWeatherDetails = async (lat, lon) => {
    const FORECAST_API = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
    const WEATHER_API = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;

    await axios.get(FORECAST_API).then((data) => {
      setForecastData(data.data);
      console.log("Forecast Data: ", data.data);
    });

    await axios.get(WEATHER_API).then((data) => {
      setWeatherData(data.data);
      console.log("Weather Data: ", data.data);
    });
  };

  useEffect(() => {
    axios
      .get("http://localhost:3001/favorites")
      .then(({ data }) => setFavorites(data));
  }, []);

  const fetchWeather = async (city) => {
    await axios
      .get(`${WEATHER_API}?q=${city}&limit=1&appid=${API_KEY}`)
      .then((data) => {
        const { lat, lon } = data.data[0];
        getWeatherDetails(lat, lon);
      });
  };

  const addFavorite = async (city) => {
    const { data } = await axios.post("http://localhost:3001/favorites", {
      name: city,
    });
    setFavorites([...favorites, data]);
  };

  const removeFavorite = async (id) => {
    await axios.delete(`http://localhost:3001/favorites/${id}`);
    setFavorites(favorites.filter((city) => city.id !== id));
  };

  return (
    <div className="bg-gradient-to-b from-cyan-200 via-teal-300 to-teal-400">
      <div className="min-h-screen  mx-auto ">
        <div className="bg-white/80 backdrop-blur-lg shadow-xl  p-8">
          {/* Search Bar */}
          <SearchBar onSearch={fetchWeather} />

          {/* Main content section */}
          {weatherData && forecastData ? (
            <WeatherDisplay
              weatherData={weatherData}
              forecastData={forecastData}
            />
          ) : (
            <h1 className="text-center text-2xl font-semibold text-teal-700 mt-10 transition-all transform hover:scale-105 hover:text-teal-600 flex justify-center items-center">
              Search to get weather information
              <HiArrowCircleUp className="ml-2 text-teal-700" />
            </h1>
          )}

          {/* Add Favorite Button */}
          {weatherData && (
            <div className="flex justify-center mt-4">
              <button
                onClick={() => addFavorite(weatherData.name)}
                className="bg-gradient-to-r from-teal-500 to-teal-700 text-white py-3 px-6 rounded-full hover:from-teal-600 hover:to-teal-800 mt-10 text-2xl font-medium transform hover:scale-105 transition-transform"
              >
                Add to Favorites
              </button>
            </div>
          )}

          {/* Favorites List */}
          <FavoritesList
            favorites={favorites}
            onRemove={removeFavorite}
            onShowWeather={fetchWeather}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
