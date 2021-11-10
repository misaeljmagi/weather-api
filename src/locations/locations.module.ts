import { Module } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { LocationsController } from './locations.controller';
import { GeoLocationService } from 'src/services/geo-location.service';

@Module({
  controllers: [LocationsController],
  providers: [LocationsService, GeoLocationService],
})
export class LocationsModule {}
