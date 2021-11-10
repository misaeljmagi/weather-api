import { ApiResponseProperty } from '@nestjs/swagger';

export class CurrentWeather {
  @ApiResponseProperty({ type: Number })
  temp: number;

  @ApiResponseProperty({ type: Number })
  feels_like: number;

  @ApiResponseProperty({ type: Number })
  pressure: number;

  @ApiResponseProperty({ type: Number })
  humidity: number;
}
export class WeatherResponseDto {
  @ApiResponseProperty({ type: CurrentWeather })
  current: CurrentWeather;
}
