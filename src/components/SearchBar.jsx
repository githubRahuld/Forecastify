import React, { useState } from "react";
import { FaSearch } from "react-icons/fa"; // Import the FaSearch icon

const SearchBar = ({ onSearch }) => {
  const [city, setCity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city);
      setCity("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex justify-center items-center w-full p-4"
    >
      {/* Input container with enhanced styling */}
      <div className="relative w-full max-w-3xl shadow-lg rounded-lg overflow-hidden">
        <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-teal-500 text-xl" />
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full p-4 pl-14 pr-4 text-lg border-0 focus:ring-2 focus:ring-teal-500 focus:outline-none"
        />
      </div>
      <button
        type="submit"
        className="ml-4 bg-teal-500 text-white p-4 px-8 rounded-lg text-lg font-semibold shadow-md transform transition-transform hover:scale-105 hover:bg-teal-600 focus:ring-4 focus:ring-teal-300"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
