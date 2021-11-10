import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { LocationsService } from './locations.service';

@Controller('locations/v1')
@ApiTags('Locations')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @Get('')
  @ApiOperation({
    summary: 'Get  location',
    description: 'Returns location information given a city name',
  })
  @ApiQuery({ name: 'city', type: String, required: false })
  async getLocation(@Query() params?: { city: string }) {
    return this.locationsService.getLocation(params);
  }

  @Get('/reverse')
  @ApiOperation({
    summary: 'Get reverse location',
    description: 'Returns location information given latitude and longitude',
  })
  @ApiQuery({ name: 'lat', type: Number, required: false })
  @ApiQuery({ name: 'lon', type: Number, required: false })
  async getReverseLocation(@Query() params?: { lat: number; lon: number }) {
    return this.locationsService.getReverseLocation(params);
  }
}
