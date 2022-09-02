import { useState } from 'react';
import './App.css';
import Search from './components/search/search.js';
import CurrentWeather from './components/current-weather/current-weather.js';
import { WEATHER_API_URL, WEATHER_API_KEY } from './api';
import Forecast from './components/forecast/forecast.js';

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecastr] = useState(null);

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    const CurrentWeatherFetch = fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);
    const forecastFetch = fetch(`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);

    Promise.all([CurrentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();

        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecastr({ city: searchData.label, ...forecastResponse });
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange} />
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecast && <Forecast data={forecast} />}
    </div>
  );
}

export default App;
