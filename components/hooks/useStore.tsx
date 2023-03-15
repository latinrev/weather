import Image from "next/image";
const mockData = {
  data: {
    latitude: 32.812614,
    longitude: -96.96307,
    generationtime_ms: 0.4819631576538086,
    utc_offset_seconds: -21600,
    timezone: "America/Denver",
    timezone_abbreviation: "MDT",
    elevation: 151.0,
    current_weather: { temperature: 18.9, windspeed: 23.3, winddirection: 163.0, weathercode: 0, time: "2023-03-15T13:00" },
    daily_units: { time: "iso8601", weathercode: "wmo code", temperature_2m_max: "°C", temperature_2m_min: "°C" },
    daily: { time: ["2023-03-15"], weathercode: [3], temperature_2m_max: [21.2], temperature_2m_min: [7.3] },
  },
};
const weatherCodeChart = {
  0: "Clear Skies",
  1: "Clear",
  2: "Partly Cloudy",
  3: "Overcast",
  45: "Foggy",
  48: "Foggiest",
  51: "Light Drizzle",
  53: "Moderate Drizzle",
  55: "Search for a roof, it's drizzling",
  56: "Freezing drizzle",
  57: "Heavy freezing drizzle",
  61: "Light rain",
  63: "Rain",
  65: "Heavy rain",
  66: "Light freezing rain",
  67: "Heavy freezing rain",
  71: "Light snow",
  73: "Snow",
  75: "Heavy snow",
  77: "Snow grains",
  80: "Light rain showers",
  81: "Medium rain showers",
  82: "Violent rain showers",
  85: "Light snow shower",
  86: "Heavy snow shower",
  95: "Thunderstorm",
  96: "Thunderstorm with light hail",
  99: "Thunderstorm with heavy hail",
};
export default function useStore() {
  return {};
}

export async function getTemperature() {
  /*   const data = await fetch(
    "https://api.open-meteo.com/v1/forecast?latitude=32.81&longitude=-96.95&daily=weathercode,temperature_2m_max,temperature_2m_min&forecast_days=1&start_date=2023-03-15&end_date=2023-03-15&timezone=America%2FDenver"
  ); */
  const {
    data: { current_weather, daily },
  } = mockData || []; // await data.json()
  let weatherState = getWeatherState(current_weather.weathercode);
  return {
    temperature: Math.round(current_weather.temperature),
    state: weatherState,
    max: Math.round(daily.temperature_2m_max),
    min: Math.round(daily.temperature_2m_min),
  };
}

export function getWeatherState(weatherCode) {
  return weatherCodeChart[weatherCode];
}

/* //0	Clear sky
1, 2, 3	Mainly clear, partly cloudy, and overcast
45, 48	Fog and depositing rime fog
51, 53, 55	Drizzle: Light, moderate, and dense intensity
56, 57	Freezing Drizzle: Light and dense intensity
61, 63, 65	Rain: Slight, moderate and heavy intensity
66, 67	Freezing Rain: Light and heavy intensity
71, 73, 75	Snow fall: Slight, moderate, and heavy intensity
77	Snow grains
80, 81, 82	Rain showers: Slight, moderate, and violent
85, 86	Snow showers slight and heavy
95 *	Thunderstorm: Slight or moderate
//96, 99 *	Thunderstorm with slight and heavy hail */
