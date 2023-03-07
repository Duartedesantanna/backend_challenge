import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { PlacesService } from './places.service';
import { CreatePlaceDto } from './dto/create-place.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IndexPlacesSwagger } from './swagger/index-places.swagger';
import { BadRequestSwagger } from './hekpers/swagger/bad-request.swagger';
import { NotFoundSwagger } from './hekpers/swagger/not-found.swagger';

@Controller('api/places')
@ApiTags('Places')
export class PlacesController {
  constructor(private readonly placesService: PlacesService) {}

  @Post()
  @ApiOperation({
    summary: 'Create new goal.',
  })
  @ApiResponse({
    status: 201,
    description: 'New goal created with success',
    type: IndexPlacesSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
    type: BadRequestSwagger,
  })
  async create(@Body() createPlaceDto: CreatePlaceDto) {
    return await this.placesService.create(createPlaceDto);
  }

  @Get()
  @ApiOperation({
    summary: 'List all goals.',
  })
  @ApiResponse({
    status: 200,
    description: 'List goals successfully',
    type: IndexPlacesSwagger,
    isArray: true,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
    type: BadRequestSwagger,
  })
  async allItems() {
    return await this.placesService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'View a goal.',
  })
  @ApiResponse({
    status: 200,
    description: 'View a goal successfully',
    type: IndexPlacesSwagger,
    isArray: true,
  })
  @ApiResponse({
    status: 404,
    description: 'Goal not found',
    type: NotFoundSwagger,
  })
  async showitem(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.placesService.findOneConverted(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Edit a goal.',
  })
  @ApiResponse({
    status: 200,
    description: 'Goal successfully updated',
    type: IndexPlacesSwagger,
    isArray: true,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
    type: BadRequestSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'Goal not found',
    type: NotFoundSwagger,
  })
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updatePlaceDto: UpdatePlaceDto,
  ) {
    return await this.placesService.update(id, updatePlaceDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a goal.',
  })
  @ApiResponse({ status: 200, description: 'Goal successfully delete' })
  @ApiResponse({
    status: 404,
    description: 'Goal not found',
    type: NotFoundSwagger,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.placesService.remove(id);
  }
}
