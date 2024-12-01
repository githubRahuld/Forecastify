# Weather App

A simple and interactive weather application built with React that allows users to search for weather information by city name. The app displays current weather conditions, including temperature, humidity, wind speed, and more. It also provides a 5-day weather forecast and allows users to save their favorite cities for quick access.

## Features

- Search for weather information by city name.
- View current weather data (temperature, humidity, wind speed, etc.).
- 5-day weather forecast with daily temperature and weather icons.
- Toggle between Celsius and Fahrenheit for temperature.
- Add and remove cities from favorites.
- Displays sunrise and sunset times.
- Clean and responsive design with a gradient background and interactive animations.

## Technologies Used

- **React** - JavaScript library for building user interfaces.
- **React Icons** - To add weather-related icons and other icons.
- **Tailwind CSS** - For styling and responsive design.
- **OpenWeatherMap API** - For fetching weather data.

## Installation

To run the project locally, follow the steps below:

1. Clone this repository:

   ```bash
   git clone https://github.com/your-username/weather-app.git
   ```

2. Navigate to the project directory:

   ```bash
   cd weather-app
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Create a .env file in the root of the project and add your OpenWeatherMap API key:

   ```bash
   VITE_API_KEY=your_api_key
   VITE_API_URL=your_openWeatherMap_URL
   ```

5. Run the development server:

   ```bash
   npm start
   ```

6. Open your browser and visit http://localhost:5173 to view the app.

7. Run the JSON Server:
   ```bash
   npx json-server --watch db.json --port 3001
   ```
