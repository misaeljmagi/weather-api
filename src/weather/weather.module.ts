import { Module } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { WeatherController } from './weather.controller';
import { GeoLocationService } from 'src/services/geo-location.service';

import { OpenWeatherService } from 'src/services/open-weather.service';

@Module({
  controllers: [WeatherController],
  providers: [WeatherService, GeoLocationService, OpenWeatherService],
})
export class WeatherModule {}
