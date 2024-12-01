import React, { useState } from "react";
import {
  FaCloudSun,
  FaTemperatureHigh,
  FaTemperatureLow,
} from "react-icons/fa";
import {
  WiDaySunny,
  WiRain,
  WiWindy,
  WiCloudy,
  WiThermometer,
  WiSunrise,
  WiSunset,
} from "react-icons/wi";

const WeatherDisplay = ({ weatherData, forecastData }) => {
  const [unit, setUnit] = useState("C");

  // Toggle between Celsius and Fahrenheit
  const toggleUnit = () => {
    setUnit(unit === "C" ? "F" : "C");
  };
  const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Convert temperature based on the selected unit
  const convertTemp = (tempK) =>
    unit === "C"
      ? `${Math.round(tempK - 273.15)}°C`
      : `${Math.round(((tempK - 273.15) * 9) / 5 + 32)}°F`;

  const getWeatherIcon = (description) => {
    if (description.includes("clear"))
      return <WiDaySunny className="text-yellow-500 text-6xl" />;
    if (description.includes("cloud"))
      return <WiCloudy className="text-gray-500 text-6xl" />;
    if (description.includes("rain"))
      return <WiRain className="text-blue-500 text-6xl" />;
    if (description.includes("wind"))
      return <WiWindy className="text-green-500 text-6xl" />;
    return <FaCloudSun className="text-gray-500 text-6xl" />;
  };

  if (!weatherData) return <div>Loading weather data...</div>;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10">
      <div className="bg-gradient-to-r from-blue-50 to-teal-100 rounded-xl shadow-2xl p-10 flex flex-col items-center">
        {/* Header with Icon and Location */}
        <div className="flex items-center justify-center mb-8">
          <div className="animate-pulse">
            {getWeatherIcon(weatherData.weather[0].description)}
          </div>
          <h2 className="text-5xl font-extrabold text-teal-800 ml-6">
            {weatherData.name}
          </h2>
        </div>

        {/* Temperature and Description */}
        <p className="text-4xl text-gray-800 mt-4 text-center font-semibold">
          {convertTemp(weatherData.main.temp)}
        </p>
        <p className="text-2xl text-gray-700 mt-2 text-center capitalize">
          {weatherData.weather[0].description}
        </p>

        {/* Additional Information */}
        <div className="flex flex-wrap justify-center mt-8 gap-10">
          <div className="flex items-center">
            <FaTemperatureHigh className="text-red-500 text-4xl" />
            <span className="ml-3 text-2xl">
              {convertTemp(weatherData.main.temp_max)}
            </span>
          </div>
          <div className="flex items-center">
            <FaTemperatureLow className="text-blue-500 text-4xl" />
            <span className="ml-3 text-2xl">
              {convertTemp(weatherData.main.temp_min)}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap justify-center mt-6 gap-8">
          <div className="flex items-center">
            <WiThermometer className="text-teal-600 text-4xl" />
            <span className="ml-3 text-2xl">
              Humidity: {weatherData.main.humidity}%
            </span>
          </div>
          <div className="flex items-center">
            <WiWindy className="text-green-500 text-4xl" />
            <span className="ml-3 text-2xl">
              Wind: {weatherData.wind.speed} m/s
            </span>
          </div>
        </div>

        {/* Sunrise and Sunset */}
        <div className="flex flex-wrap justify-center mt-8 gap-10">
          <div className="flex items-center">
            <WiSunrise className="text-orange-500 text-4xl" />
            <span className="ml-3 text-2xl">
              Sunrise: {formatTime(weatherData.sys.sunrise)}
            </span>
          </div>
          <div className="flex items-center">
            <WiSunset className="text-red-500 text-4xl" />
            <span className="ml-3 text-2xl">
              Sunset: {formatTime(weatherData.sys.sunset)}
            </span>
          </div>
        </div>

        {/* Toggle Button */}
        <button
          onClick={toggleUnit}
          className="bg-gradient-to-r from-teal-500 to-teal-700 text-white py-3 px-6 rounded-full hover:from-teal-600 hover:to-teal-800 mt-10 text-2xl font-medium transform hover:scale-105 transition-transform"
        >
          Switch to <span>{unit === "C" ? "Fahrenheit" : "Celsius"}</span>
        </button>
      </div>

      {/* Forecast Information */}
      <div className="bg-gradient-to-r from-blue-50 to-teal-100 rounded-xl shadow-2xl p-8">
        <h3 className="text-3xl font-bold text-teal-800 mb-6 text-center">
          5-Day Forecast
        </h3>
        <ul className="space-y-6">
          {forecastData?.list
            .filter((forecast) => forecast.dt_txt.includes("12:00:00"))
            .slice(0, 5)
            .map((day, index) => (
              <li
                key={index}
                className="flex justify-between items-center bg-white p-6 rounded-lg shadow-md transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg"
              >
                <div className="flex items-center">
                  <div className="text-4xl">
                    {getWeatherIcon(day.weather[0].description)}
                  </div>
                  <div className="ml-4">
                    <span className="block text-xl font-semibold text-gray-700">
                      {new Date(day.dt_txt).toLocaleDateString("en-US", {
                        weekday: "long",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                    <span className="text-gray-600 text-lg capitalize">
                      {day.weather[0].description}
                    </span>
                  </div>
                </div>
                <div className="text-2xl font-semibold text-teal-700">
                  {convertTemp(day.main.temp)}
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default WeatherDisplay;
