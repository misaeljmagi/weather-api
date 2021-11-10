import { ApiResponseProperty } from '@nestjs/swagger';

export class GetLocationResponseDto {
  @ApiResponseProperty({ type: String })
  status?: string;

  @ApiResponseProperty({ type: String })
  country?: string;

  @ApiResponseProperty({ type: String })
  countryCode?: string;

  @ApiResponseProperty({ type: String })
  region?: string;

  @ApiResponseProperty({ type: String })
  regionName?: string;

  @ApiResponseProperty({ type: String })
  city?: string;

  @ApiResponseProperty({ type: Number })
  lat: number;

  @ApiResponseProperty({ type: Number })
  lon: number;
}
