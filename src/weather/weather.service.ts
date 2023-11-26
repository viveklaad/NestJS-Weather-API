// src/weather/weather.service.ts
import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class WeatherService {
  async getWeather(location: string, yesterday: boolean = false): Promise<any> {
    const apiKey = `${process.env.OPENWEATHERMAP_API_KEY}`;
    const baseUrl = 'https://api.openweathermap.org/data/2.5/onecall';

    try {
      const params: any = {
        appid: apiKey,
      };

      if (yesterday) {
        // Fetching yesterday's weather
        const response = await this.getWeatherForDate(location, new Date());
        return response.data;
      } else {
        // Fetching current weather
        params.q = location;
        const response = await axios.get(baseUrl, { params });
        return response.data;
      }
    } catch (error) {
      throw new Error(
        `Error fetching weather data for ${location}: ${error.message}`,
      );
    }
  }

  private async getWeatherForDate(location: string, date: Date): Promise<any> {
    const apiKey = `${process.env.OPENWEATHERMAP_API_KEY}`;
    const baseUrl =
      'https://api.openweathermap.org/data/2.5/onecall/timemachine';

    try {
      const params = {
        appid: apiKey,
        lat: '', // Add the latitude of the location
        lon: '', // Add the longitude of the location
        dt: Math.floor(date.getTime() / 1000),
      };

      const response = await axios.get(baseUrl, { params });
      return response;
    } catch (error) {
      throw new Error(
        `Error fetching weather data for ${location} on ${date}: ${error.message}`,
      );
    }
  }
}
