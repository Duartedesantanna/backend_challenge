import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlaceEntity } from './entities/place.entity';
import { CreatePlaceDto } from './dto/create-place.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';

@Injectable()
export class PlacesService {
  constructor(
    @InjectRepository(PlaceEntity)
    private readonly placesRepository: Repository<PlaceEntity>,
  ) {}

  async create(createPlaceDto: CreatePlaceDto) {
    const exist = await this.placeExist(createPlaceDto, null, null);
    const newData = await this.formatDataIn(createPlaceDto, null);
    if (exist) {
      throw new BadRequestException(`Desired location is already registered.`);
    } else {
      return await this.placesRepository.save(
        this.placesRepository.create({
          country: createPlaceDto.country,
          place: createPlaceDto.place,
          goal: newData,
          url: createPlaceDto.url,
        }),
      );
    }
  }

  async placeExist(
    createPlaceDto: CreatePlaceDto,
    updatePlaceDto: UpdatePlaceDto,
    idUpdate: string,
  ) {
    if (createPlaceDto) {
      return await this.placesRepository.findOne({
        where: {
          country: createPlaceDto.country,
          place: createPlaceDto.place,
        },
      });
    } else if (updatePlaceDto) {
      const place = await this.findOne(idUpdate);
      if (place.place == updatePlaceDto.place) {
        return undefined;
      } else {
        return await this.placesRepository.findOne({
          where: {
            country: place.country,
            place: updatePlaceDto.place,
          },
        });
      }
    }
  }

  async formatDataIn(
    createPlaceDto: CreatePlaceDto,
    updatePlaceDto: UpdatePlaceDto,
  ) {
    let arrayDate = [];
    if (createPlaceDto) {
      arrayDate = createPlaceDto.goal.toString().split('/');
    } else if (updatePlaceDto) {
      arrayDate = updatePlaceDto.goal.toString().split('/');
    }
    const year = parseInt(arrayDate[1]);
    const month = parseInt(arrayDate[0]);
    return new Date(year, month - 1);
  }

  async formatDataOut(date: Date) {
    return new Intl.DateTimeFormat('pt-BR', {
      year: 'numeric',
      month: '2-digit',
    }).format(date);
  }

  async findAll() {
    const all = await this.placesRepository.find({
      order: {
        goal: 'ASC',
      },
    });
    const allArrayResponse = [];
    for (let i = 0; i < all.length; i++) {
      allArrayResponse[i] = {
        id: all[i].id,
        country: all[i].country,
        place: all[i].place,
        goal: await this.formatDataOut(all[i].goal),
        url: all[i].url,
        createdAt: all[i].createdAt,
        updatedAt: all[i].updatedAt,
      };
    }
    return allArrayResponse;
  }

  async findOne(id: string) {
    try {
      return await this.placesRepository.findOneOrFail(id);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async findOneConverted(id: string) {
    const findOne = await this.findOne(id);
    const findOneResponse = {
      id: findOne.id,
      country: findOne.country,
      place: findOne.place,
      goal: await this.formatDataOut(findOne.goal),
      url: findOne.url,
      createdAt: findOne.createdAt,
      updatedAt: findOne.updatedAt,
    };
    return findOneResponse;
  }

  async update(id: string, updatePlaceDto: UpdatePlaceDto) {
    const place = await this.findOne(id);
    this.placesRepository.merge(place, updatePlaceDto);
    const exist = await this.placeExist(null, updatePlaceDto, id);
    const newData = await this.formatDataIn(null, updatePlaceDto);
    if (exist) {
      throw new BadRequestException(`Desired location is already registered.`);
    } else {
      await this.placesRepository.update(id, {
        place: updatePlaceDto.place,
        goal: newData,
      });
      return await this.findOneConverted(id);
    }
  }

  async remove(id: string) {
    await this.placesRepository.findOneOrFail(id);
    await this.placesRepository.delete(id);
  }
}
