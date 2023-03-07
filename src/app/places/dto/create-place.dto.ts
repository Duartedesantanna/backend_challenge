import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreatePlaceDto {
  @IsNotEmpty({ message: 'Required country field' })
  @ApiProperty()
  country: string;

  @IsNotEmpty({ message: 'Required place field' })
  @ApiProperty()
  place: string;

  @IsNotEmpty({ message: 'Required goal field' })
  @ApiProperty()
  goal: string;

  @IsNotEmpty({ message: 'Required url field' })
  @ApiProperty()
  url: string;
}
