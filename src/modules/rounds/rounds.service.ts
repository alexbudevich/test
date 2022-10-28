import {Inject, Injectable} from '@nestjs/common';
import { CreateRoundDto } from './dto/create-round.dto';
import { UpdateRoundDto } from './dto/update-round.dto';
import {Repository} from "typeorm";
import {Player} from "../players/entities/player.entity";
import {Round} from "./entities/round.entity";

@Injectable()
export class RoundsService {

  constructor(
      @Inject('ROUND_REPOSITORY')
      private roundRepository: Repository<Round>,
  ) {}
  create(createRoundDto: CreateRoundDto) {
    return 'This action adds a new round';
  }

  findAll() {
    return this.roundRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} round`;
  }

  update(id: number, updateRoundDto: UpdateRoundDto) {
    return `This action updates a #${id} round`;
  }

  remove(id: number) {
    return `This action removes a #${id} round`;
  }
}
