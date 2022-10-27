import {Inject, Injectable} from '@nestjs/common';
import { CreateSportDto } from './dto/create-sport.dto';
import { UpdateSportDto } from './dto/update-sport.dto';
import {Repository} from "typeorm";
import {Season} from "../seasons/entities/season.entity";
import {Sport} from "./entities/sport.entity";

@Injectable()
export class SportsService {

  constructor(
      @Inject('SPORT_REPOSITORY')
      private sportRepository: Repository<Sport>,
  ) {}
  create(createSportDto: CreateSportDto) {
    return 'This action adds a new sport';
  }

  findAll() {
    return this.sportRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} sport`;
  }

  update(id: number, updateSportDto: UpdateSportDto) {
    return `This action updates a #${id} sport`;
  }

  remove(id: number) {
    return `This action removes a #${id} sport`;
  }
}
