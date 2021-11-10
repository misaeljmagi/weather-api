import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  DailyForecast,
  GetWeatherResponseDto,
} from 'src/services/dto/get-weather-response.dto';
import { WeatherResponseDto } from './dto/weather-response.dto';

import { WeatherService } from './weather.service';

@Controller('weather/v1')
@ApiTags('Weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get('/current')
  @ApiOperation({
    summary: 'Get current weather',
    description:
      'Returns current weather for a location given city name or latitude and longitude',
  })
  @ApiQuery({ name: 'city', type: String, required: false })
  @ApiQuery({ name: 'lat', type: Number, required: false })
  @ApiQuery({ name: 'lon', type: Number, required: false })
  @ApiResponse({ type: WeatherResponseDto })
  getCurrentWeather(
    @Query() params?: { city: string; lat: number; lon: number },
  ): Promise<WeatherResponseDto> {
    return this.weatherService.getCurrentWeather(params);
  }

  @Get('/forecast')
  @ApiOperation({
    summary: 'Get forecast',
    description:
      'Returns forecast weather for a location given city name or latitude and longitude',
  })
  @ApiQuery({ name: 'lat', type: Number, required: false })
  @ApiQuery({ name: 'lon', type: Number, required: false })
  @ApiResponse({ type: DailyForecast })
  getForecast(
    @Query() params?: { lat: number; lon: number },
  ): Promise<DailyForecast[]> {
    return this.weatherService.getForecast(params);
  }
}
