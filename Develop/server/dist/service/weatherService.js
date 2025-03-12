import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();
console.log("API Key:", process.env.OPENWEATHER_API_KEY);
class Weather {
    constructor(city, temperature, windSpeed, humidity, description, icon, date) {
        this.city = city;
        this.temperature = temperature;
        this.windSpeed = windSpeed;
        this.humidity = humidity;
        this.description = description;
        this.icon = icon;
        this.date = date;
    }
}
class WeatherService {
    constructor() {
        this.baseURL = 'https://api.openweathermap.org/data/2.5/forecast';
        this.geoBaseURL = 'http://api.openweathermap.org/geo/1.0/direct';
        this.apiKey = process.env.OPENWEATHER_API_KEY;
    }
    async fetchLocationData(city) {
        try {
            const geoResponse = await axios.get(`${this.geoBaseURL}?q=${city}&limit=1&appid=${this.apiKey}`);
            if (geoResponse.data.length === 0) {
                throw new Error('City not found');
            }
            return { lat: geoResponse.data[0].lat, lon: geoResponse.data[0].lon };
        }
        catch (error) {
            console.error(error);
            throw new Error('Error while retrieving city location');
        }
    }
    buildWeatherQuery(coordinates) {
        return `${this.baseURL}?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${this.apiKey}&units=metric`;
    }
    async fetchWeatherData(city) {
        const coordinates = await this.fetchLocationData(city);
        const weatherResponse = await axios.get(this.buildWeatherQuery(coordinates));
        return weatherResponse.data;
    }
    async getWeatherForCity(city) {
        const weatherData = await this.fetchWeatherData(city);
        const currentWeather = new Weather(city, Math.round(weatherData.list[0].main.temp), // ✅ Redondear temperatura
        weatherData.list[0].wind.speed, weatherData.list[0].main.humidity, weatherData.list[0].weather[0].description, weatherData.list[0].weather[0].icon, new Date(weatherData.list[0].dt * 1000).toLocaleDateString());
        const forecast = weatherData.list
            .filter((_item, index) => index % 8 === 0) // ✅ Tomar un dato cada 24 horas
            .map((item) => new Weather(city, Math.round(item.main.temp), // ✅ Redondear temperatura
        item.wind.speed, item.main.humidity, item.weather[0].description, item.weather[0].icon, new Date(item.dt * 1000).toLocaleDateString()));
        return { current: currentWeather, forecast };
    }
}
export default new WeatherService();
