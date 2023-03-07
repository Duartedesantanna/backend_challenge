//import { PartialType } from '@nestjs/mapped-types';
//import { CreatePlaceDto } from './create-place.dto';

//export class UpdatePlaceDto extends PartialType(CreatePlaceDto) {}
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdatePlaceDto {
  @IsNotEmpty({ message: 'Required place field' })
  @ApiProperty()
  place: string;

  @IsNotEmpty({ message: 'Required goal field' })
  @ApiProperty()
  goal: string;
}
