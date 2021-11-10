import { HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from 'nestjs-config';

import Axios from 'axios';
import { HttpService } from '@nestjs/axios';

import { lastValueFrom } from 'rxjs';
import { GetWeatherResponseDto } from './dto/get-weather-response.dto';
import { pick } from 'lodash';
import { AxiosError } from '@nestjs/common/node_modules/axios';

@Injectable()
export class OpenWeatherService {
  openWeatherService: HttpService;

  constructor(private readonly configService: ConfigService) {
    const { openWeatherBaseUrl, openWeatherApiKey } =
      this.configService.get('app');
    this.openWeatherService = new HttpService(
      Axios.create({
        baseURL: openWeatherBaseUrl,
        params: {
          appid: openWeatherApiKey,
          units: 'metric',
          exclude: 'minutely,hourly',
        },
      }),
    );
  }

  async getWeather(lat: number, lon: number): Promise<GetWeatherResponseDto> {
    try {
      const {
        data: { current, daily },
      } = await lastValueFrom(
        this.openWeatherService.get('/data/2.5/onecall', {
          params: { lat, lon },
        }),
      );

      return {
        current: {
          ...pick(current, [
            'sunrise',
            'sunset',
            'temp',
            'feels_like',
            'pressure',
            'humidity',
          ]),
          ...current.weather[0],
        },
        daily,
      };
    } catch (error) {
      const axiosError = error as AxiosError;

      if (axiosError.response.status === HttpStatus.TOO_MANY_REQUESTS) {
        return;
      }
    }
  }
}
