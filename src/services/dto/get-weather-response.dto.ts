export class GetWeatherResponseDto {
  'current': CurrentTemperature & WeatherDescription;
  'daily': DailyForecast[];
}

export class DailyForecast {
  'dt': number;
  'sunrise': number;
  'sunset': number;
  'moonrise': number;
  'moonset': number;
  'moon_phase': number;
  'temp': DailyTemperature;
  'feels_like': DailyTemperature;
}

export class CurrentTemperature {
  'sunrise': number;
  'sunset': number;
  'temp': number;
  'feels_like': number;
  'pressure': number;
  'humidity': number;
}

export class DailyTemperature {
  'day': number;
  'min': number;
  'max': number;
  'night': number;
  'eve': number;
  'morn': number;
}

export class WeatherDescription {
  'main': string;
  'description': string;
  'icon': string;
}
