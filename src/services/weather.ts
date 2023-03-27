import { Location } from "@/interfaces/LocationInterface";

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
type codeChart = { [key: number]: string }
const weatherCodeChart: codeChart = {
    0: "clear skies",
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

export function buildURL({ latitude, longitude }: Location) {
    return `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weathercode,temperature_2m_max,temperature_2m_min&current_weather=true&forecast_days=1&timezone=America%2FNew_York`;

}
export async function getTemperatureInformation() {
    const data = await fetch(
        "https://api.open-meteo.com/v1/forecast?latitude=32.78&longitude=-96.81&daily=weathercode,temperature_2m_max,temperature_2m_min&current_weather=true&forecast_days=1&timezone=America%2FNew_York"
    );
    const { current_weather, daily } = await data.json()
}

export function buildTemperatureInfo(fetchedData) {
    let weatherState = getWeatherState(fetchedData.current_weather.weathercode);
    return {
        temperature: Math.round(fetchedData.current_weather.temperature),
        state: weatherState.toUpperCase(),
        max: Math.round(fetchedData.daily.temperature_2m_max[0]),
        min: Math.round(fetchedData.daily.temperature_2m_min[0]),
    };
}

export function getWeatherState(weatherCode: number) {
    return weatherCodeChart[weatherCode];
}