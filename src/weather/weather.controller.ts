// src/weather/weather.controller.ts
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { AuthGuard } from '../auth/auth.guard';
import { Roles } from 'src/decorators/roles.decorator';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get('/weather-for-all')
  @Roles('admin', 'user') // Specify the roles as arguments to the decorator
  @UseGuards(AuthGuard)
  async getWeatherForAll(
    @Query('locations') locations: string[],
  ): Promise<any[]> {
    if (!locations || locations.length === 0) {
      return Promise.reject('Invalid input: No locations provided');
    }

    try {
      // Fetch weather for all locations concurrently
      const weatherPromises = locations.map((location) =>
        this.weatherService.getWeather(location),
      );
      const weatherResults = await Promise.all(weatherPromises);

      return weatherResults;
    } catch (error) {
      throw new Error(
        `Error fetching weather data for all locations: ${error.message}`,
      );
    }
  }

  @Get('/weather')
  @UseGuards(AuthGuard)
  @Roles('admin', 'user') // Specify the roles as arguments to the decorator
  async getWeather(@Query('location') location: string): Promise<any> {
    if (!location) {
      return Promise.reject('Invalid input: No location provided');
    }

    try {
      // Fetch current weather
      const currentWeather = await this.weatherService.getWeather(location);

      // Fetch yesterday's weather
      const yesterdayWeather = await this.weatherService.getWeather(
        location,
        true,
      );

      return { currentWeather, yesterdayWeather };
    } catch (error) {
      throw new Error(
        `Error fetching weather data for ${location}: ${error.message}`,
      );
    }
  }
}
