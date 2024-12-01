import React from "react";
import { AiOutlineDelete } from "react-icons/ai";

const FavoritesList = ({ favorites, onRemove, onShowWeather }) => (
  <div className="mt-10 bg-gradient-to-r from-teal-50 to-blue-50 p-6 rounded-xl shadow-2xl">
    <h3 className="text-3xl font-extrabold text-teal-800 text-center mb-6">
      Favorite Cities
    </h3>
    <ul className="space-y-6">
      {favorites.map((city) => (
        <li
          key={city.id}
          className="bg-white p-6 rounded-lg shadow-md flex justify-between items-center transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg"
        >
          <button
            onClick={() => onShowWeather(city.name)}
            className="text-2xl font-semibold text-teal-600 hover:text-teal-800 transition-colors duration-300"
          >
            {city.name}
          </button>
          <button
            onClick={() => onRemove(city.id)}
            className="text-red-500 hover:text-red-700 transition-colors duration-300 flex items-center"
          >
            <AiOutlineDelete className="text-3xl" />
          </button>
        </li>
      ))}
    </ul>
  </div>
);

export default FavoritesList;
