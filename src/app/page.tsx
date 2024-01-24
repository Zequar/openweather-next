import { getSunHours } from "./utils/conversions";
import { exampleResponse, exampleResponse2, exampleGeoCoding } from "./utils/exampleResponses";
import { getWeatherData, getGeocoding } from "./api/openWeatherApi";

export default async function Home() {
  //const weatherData = await getWeatherData()
  const weatherData = exampleResponse2
  const timeZone = weatherData.timezone.replace('/', ', ').replace('_', ' ');
  const currentWeatherDescription = weatherData.current.weather[0].description;
  const currentWeatherMain = weatherData.current.weather[0].main;
  const currentTemperature = weatherData.current.temp;
  const wind = weatherData.current.wind_speed;
  const windDirection = weatherData.current.wind_deg;
  const uvi = weatherData.current.uvi;
  const humidity = weatherData.current.humidity;
  const visibility = weatherData.current.visibility / 100;
  const feelsLike = weatherData.current.feels_like;
  
  //const geoCodingAnswer = await getGeocoding()
  const geoCodingAnswer = exampleGeoCoding[0]
  const geoCodingAnswerPositions = { lon: exampleGeoCoding[0].lon, lat: exampleGeoCoding[0].lat }
  console.log(geoCodingAnswerPositions)


  const rain = weatherData.current.rain || null;
  //const snow = weatherData.current.snow || null;
  let snow: { [key: string]: number } = { ["1h"]: 0.5 }

  // sunrise 
  const { timezone_offset, current: { sunrise, sunset } } = weatherData;
  const sunHours = getSunHours({ sunrise, sunset, timezone_offset })

  // icon 
  const icon = weatherData.current.weather[0].icon

  return (
    <main className="px-64 py-32">
      <div>
        <h1 className="text-4xl font-bold">{timeZone}</h1>

        <div className="flex flex-row items-center">
          <p className="text-3xl">
            {currentTemperature}°C<span className="text-sm">(feeling {feelsLike}°C)</span> 
          </p>
          <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`}/>
          <p>
            {currentWeatherMain}, {currentWeatherDescription}
          </p>
        </div>
        
        
        
        <div className="flex items-center justify-between border-b border-gray-600 rounded p-4">
          <h4 className="text-xl font-bold self-start">☀️ Suntime</h4>
          <p>
            Rising {sunHours[0]} - Setting {sunHours[1]}
          </p>
        </div>
        <div className="flex items-center justify-between border-b border-gray-600 rounded p-4">
          <h4 className="text-xl font-bold self-start">💨 Wind</h4>
          <p>
            {wind} m/s, {windDirection}°
          </p>
        </div>

        { rain && 
          <div className="flex items-center justify-between border-b border-gray-600 rounded p-4">
            <h4 className="text-xl font-bold self-start">🌧️ Rain</h4>
            <p>
              {rain["1h"]} mm/h
            </p>
          </div> 
        }
        { snow && 
          <div className="flex items-center justify-between border-b border-gray-600 rounded p-4">
            <h4 className="text-xl font-bold self-start">❄️ Snow</h4>
            <p>
              {snow["1h"]} mm/h
            </p>
          </div> 
        }
        <div className="flex items-center justify-between border-b border-gray-600 rounded p-4">
          <h4 className="text-xl font-bold self-start">☀️ UVI</h4>
          <p>
            {uvi}
          </p>
        </div>
        <div className="flex items-center justify-between border-b border-gray-600 rounded p-4">
          <h4 className="text-xl font-bold self-start">👁️ Visibility</h4>
          <p>
            {visibility}%
          </p>
        </div>
        <div className="flex items-center justify-between border-b border-gray-600 rounded p-4">
          <h4 className="text-xl font-bold self-start">💧 Humidity</h4>
          <p>
            {humidity}%
          </p>
        </div>
        
      </div>
    </main>
  );
}