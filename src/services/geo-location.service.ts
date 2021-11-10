import { Injectable } from '@nestjs/common';
import { ConfigService } from 'nestjs-config';

import Axios from 'axios';
import { HttpService } from '@nestjs/axios';

import { GetLocationResponseDto } from './dto/get-location-response.dto';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class GeoLocationService {
  ipApiService: HttpService;
  mapquestService: HttpService;

  constructor(private readonly configService: ConfigService) {
    const { ipApiMicroserviceBaseUrl, mapQuestBaseUrl, mapQuestApiKey } =
      this.configService.get('app');

    this.ipApiService = new HttpService(
      Axios.create({ baseURL: ipApiMicroserviceBaseUrl }),
    );

    this.mapquestService = new HttpService(
      Axios.create({
        baseURL: mapQuestBaseUrl,
        params: { key: mapQuestApiKey },
      }),
    );
  }

  async getCurrentLocation(): Promise<GetLocationResponseDto> {
    const { data } = await lastValueFrom(this.ipApiService.get('/json'));

    return data;
  }

  async getGeolocation(location: string): Promise<GetLocationResponseDto> {
    const {
      data: {
        results: [result],
      },
    } = await lastValueFrom(
      this.mapquestService.get('/geocoding/v1/address', {
        params: { location },
      }),
    );

    const { locations } = result;

    const filteredLocations = locations
      .filter((location) => location.adminArea5 !== '')
      .map((location) => ({
        country: location.adminArea1,
        state: location.adminArea3,
        city: location.adminArea5,
        lat: location.latLng.lat,
        lon: location.latLng.lng,
      }));

    return filteredLocations;
  }

  async reverseGeolocation(lat: number, lon: number) {
    const {
      data: {
        results: [result],
      },
    } = await lastValueFrom(
      this.mapquestService.get('/geocoding/v1/reverse', {
        params: { location: `${lat},${lon}` },
      }),
    );

    const { locations } = result;

    const [location] = locations;

    return location;
  }
}
