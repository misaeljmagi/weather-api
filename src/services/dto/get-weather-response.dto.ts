import { ApiResponseProperty } from '@nestjs/swagger';

export class GetWeatherResponseDto {
  current: CurrentTemperature & WeatherDescription;
  daily: DailyForecast[];
}

export class DailyTemperature {
  @ApiResponseProperty({ type: Number })
  day: number;

  @ApiResponseProperty({ type: Number })
  min: number;

  @ApiResponseProperty({ type: Number })
  max: number;

  @ApiResponseProperty({ type: Number })
  night: number;

  @ApiResponseProperty({ type: Number })
  eve: number;

  @ApiResponseProperty({ type: Number })
  morn: number;
}

export class DailyForecast {
  @ApiResponseProperty({ type: Number })
  dt: number;

  @ApiResponseProperty({ type: Number })
  sunrise: number;

  @ApiResponseProperty({ type: Number })
  sunset: number;

  @ApiResponseProperty({ type: Number })
  moonrise: number;

  @ApiResponseProperty({ type: Number })
  moonset: number;

  @ApiResponseProperty({ type: Number })
  moon_phase: number;

  @ApiResponseProperty({ type: DailyTemperature })
  temp: DailyTemperature;

  @ApiResponseProperty({ type: DailyTemperature })
  feels_like: DailyTemperature;
}

export class CurrentTemperature {
  sunrise: number;
  sunset: number;
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
}

export class WeatherDescription {
  main: string;
  description: string;
  icon: string;
}
