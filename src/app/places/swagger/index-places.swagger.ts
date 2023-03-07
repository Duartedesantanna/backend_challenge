import { ApiProperty } from '@nestjs/swagger';
//import { PlaceEntity } from './../entities/place.entity';

//export class IndexPlacesSwagger extends PlaceEntity {}
export class IndexPlacesSwagger {
  @ApiProperty()
  id: string;

  @ApiProperty()
  country: string;

  @ApiProperty()
  place: string;

  @ApiProperty()
  goal: string;

  @ApiProperty()
  url: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}