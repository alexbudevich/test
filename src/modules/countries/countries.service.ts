import {Inject, Injectable} from '@nestjs/common';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';
import {Repository} from "typeorm";
import {Bookmaker} from "../bookmakers/entities/bookmaker.entity";

@Injectable()
export class CountriesService {

  constructor(
      @Inject('COUNTRY_REPOSITORY')
      private countryRepository: Repository<Bookmaker>,
  ) {}
  create(createCountryDto: CreateCountryDto) {
    return 'This action adds a new country';
  }

  findAll() {
    return this.countryRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} country`;
  }

  update(id: number, updateCountryDto: UpdateCountryDto) {
    return `This action updates a #${id} country`;
  }

  remove(id: number) {
    return `This action removes a #${id} country`;
  }
}
