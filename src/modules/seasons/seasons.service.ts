import {Inject, Injectable} from '@nestjs/common';
import { CreateSeasonDto } from './dto/create-season.dto';
import { UpdateSeasonDto } from './dto/update-season.dto';
import {Repository} from "typeorm";
import {Round} from "../rounds/entities/round.entity";
import {Season} from "./entities/season.entity";

@Injectable()
export class SeasonsService {

  constructor(
      @Inject('SEASON_REPOSITORY')
      private seasonRepository: Repository<Season>,
  ) {}
  create(createSeasonDto: CreateSeasonDto) {
    return 'This action adds a new season';
  }

  findAll() {
    return this.seasonRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} season`;
  }

  update(id: number, updateSeasonDto: UpdateSeasonDto) {
    return `This action updates a #${id} season`;
  }

  remove(id: number) {
    return `This action removes a #${id} season`;
  }
}
