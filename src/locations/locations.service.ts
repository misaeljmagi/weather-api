import { BadRequestException, Injectable } from '@nestjs/common';
import { GetLocationResponseDto } from 'src/services/dto/get-location-response.dto';
import { GeoLocationService } from 'src/services/geo-location.service';

@Injectable()
export class LocationsService {
  constructor(private readonly geoLocationService: GeoLocationService) {}

  async getLocation(params?: {
    city: string;
  }): Promise<GetLocationResponseDto> {
    if (params.city) {
      return this.geoLocationService.getGeolocation(params.city);
    }
    return this.geoLocationService.getCurrentLocation();
  }

  async getReverseLocation({ lat, lon }: { lat: number; lon: number }) {
    if (!lat && !lon) {
      throw new BadRequestException(`lat and lon are required!`);
    }

    return this.geoLocationService.reverseGeolocation(lat, lon);
  }
}
