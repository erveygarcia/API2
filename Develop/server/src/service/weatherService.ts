import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();
console.log("API Key:", process.env.OPENWEATHER_API_KEY);

interface Coordinates {
  lat: number;
  lon: number;
}

class Weather {
  constructor(
      public city: string,
      public temperature: number,
      public windSpeed: number,
      public humidity: number,
      public description: string,
      public icon: string,
      public date: string
  ) {}
}

class WeatherService {
  private baseURL = 'https://api.openweathermap.org/data/2.5/forecast';
  private geoBaseURL = 'http://api.openweathermap.org/geo/1.0/direct';
  private apiKey = process.env.OPENWEATHER_API_KEY as string;

  private async fetchLocationData(city: string): Promise<Coordinates> {
    try {
      const geoResponse = await axios.get(
        `${this.geoBaseURL}?q=${city}&limit=1&appid=${this.apiKey}`
      );

      if (geoResponse.data.length === 0) {
        throw new Error('City not found');
      }

      return { lat: geoResponse.data[0].lat, lon: geoResponse.data[0].lon };
    } catch (error) {
      console.error(error);
      throw new Error('Error while retrieving city location');
    }
  }

  private buildWeatherQuery(coordinates: Coordinates): string {
    return `${this.baseURL}?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${this.apiKey}&units=metric`;
  }

  private async fetchWeatherData(city: string): Promise<any> {
    const coordinates = await this.fetchLocationData(city);
    const weatherResponse = await axios.get(this.buildWeatherQuery(coordinates));
    return weatherResponse.data;
  }

  async getWeatherForCity(city: string): Promise<{ current: Weather; forecast: Weather[] }> {
    const weatherData = await this.fetchWeatherData(city);
    
    const currentWeather = new Weather(
      city,
      Math.round(weatherData.list[0].main.temp), // ✅ Redondear temperatura
      weatherData.list[0].wind.speed,
      weatherData.list[0].main.humidity,
      weatherData.list[0].weather[0].description,
      weatherData.list[0].weather[0].icon,
      new Date(weatherData.list[0].dt * 1000).toLocaleDateString()
    );

    const forecast: Weather[] = weatherData.list
        .filter((_item: any, index: number) => index % 8 === 0) // ✅ Tomar un dato cada 24 horas
        .map((item: any) => new Weather(
            city,
            Math.round(item.main.temp), // ✅ Redondear temperatura
            item.wind.speed,
            item.main.humidity,
            item.weather[0].description,
            item.weather[0].icon,
            new Date(item.dt * 1000).toLocaleDateString()
        ));

    return { current: currentWeather, forecast };
  }
}

export default new WeatherService();
