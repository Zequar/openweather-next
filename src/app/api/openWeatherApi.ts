import axios from "axios";

export async function getWeatherData() {
  const apiUrl = 'https://api.openweathermap.org/data/2.5/onecall';
    const res = await axios.get(apiUrl, {
      params: {
        lat: 40.7128,
        lon: -74.0060,
        exclude: 'minutely,hourly',
        units: "metric",
        appid: process.env.OPENWEATHER_API_KEY,
      },
    });

    const weatherData = res.data;

    console.log('weather data : ', weatherData)

    return weatherData
}

export async function getGeocoding() {
  const cityName = 'London';
  const limit = 5; // Set your desired limit
  const apiKey = process.env.OPENWEATHER_API_KEY;
  
  const apiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=${limit}&appid=${apiKey}`;

  const res = await axios.get(apiUrl)

  return res.data
}
