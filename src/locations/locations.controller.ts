import { Controller, Get, Query } from '@nestjs/common';
import { LocationsService } from './locations.service';

@Controller('locations/v1')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @Get('')
  async getLocation(@Query() params?: { city: string }) {
    return this.locationsService.getLocation(params);
  }

  @Get('/reverse')
  async getReverseLocation(@Query() params?: { lat: number; lon: number }) {
    return this.locationsService.getReverseLocation(params);
  }
}
