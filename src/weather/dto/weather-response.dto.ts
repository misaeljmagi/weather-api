export class WeatherResponseDto {
  current: CurrentWeather;
}

export class CurrentWeather {
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
}
