import {Inject, Injectable} from '@nestjs/common';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';
import {Repository} from "typeorm";
import {League} from "../leagues/entities/league.entity";
import {Match} from "./entities/match.entity";

@Injectable()
export class MatchesService {

  constructor(
      @Inject('MATCH_REPOSITORY')
      private matchRepository: Repository<Match>,
  ) {}
  create(createMatchDto: CreateMatchDto) {
    return 'This action adds a new match';
  }

  findAll() {
    return this.matchRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} match`;
  }

  update(id: number, updateMatchDto: UpdateMatchDto) {
    return `This action updates a #${id} match`;
  }

  remove(id: number) {
    return `This action removes a #${id} match`;
  }
}
