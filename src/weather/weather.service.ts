import { Injectable } from '@nestjs/common';

import { GeoLocationService } from 'src/services/geo-location.service';
import { OpenWeatherService } from 'src/services/open-weather.service';

@Injectable()
export class WeatherService {
  constructor(
    private readonly locationService: GeoLocationService,
    private readonly openWeatherService: OpenWeatherService,
  ) {}

  async getCurrentWeather(params: { city: string; lat: number; lon: number }) {
    const { city, lat, lon } = params;

    if (lat && lon) {
      const result = await this.openWeatherService.getWeather(lat, lon);

      return result;
    }
    const {
      lat: latitude,
      lon: longitude,
      city: cityName,
    } = await this.locationService.getGeolocation(city);

    const result = await this.openWeatherService.getWeather(
      latitude,
      longitude,
    );

    return { ...result, cityName };
  }

  async getForecast(params: { city: string; lat: number; lon: number }) {
    const { city, lat, lon } = params;

    if (lat && lon) {
      const { daily } = await this.openWeatherService.getWeather(lat, lon);

      return daily;
    }

    const { lat: latitude, lon: longitude } =
      await this.locationService.getGeolocation(city);

    const { daily } = await this.openWeatherService.getWeather(
      latitude,
      longitude,
    );

    return daily;
  }
}
