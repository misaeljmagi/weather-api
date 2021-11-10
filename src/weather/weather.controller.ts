import { Controller, Get, Query } from '@nestjs/common';

import { WeatherService } from './weather.service';

@Controller('weather/v1')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get('/current')
  getCurrentWeather(
    @Query() params?: { city: string; lat: number; lon: number },
  ) {
    return this.weatherService.getCurrentWeather(params);
  }

  @Get('/forecast')
  getForecast(@Query() params?: { city: string; lat: number; lon: number }) {
    return this.weatherService.getForecast(params);
  }
}
