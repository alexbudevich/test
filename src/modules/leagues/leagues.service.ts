import {Inject, Injectable} from '@nestjs/common';
import { CreateLeagueDto } from './dto/create-league.dto';
import { UpdateLeagueDto } from './dto/update-league.dto';
import {Repository} from "typeorm";
import {League} from "./entities/league.entity";

@Injectable()
export class LeaguesService {

  constructor(
      @Inject('LEAGUE_REPOSITORY')
      private leaguaRepository: Repository<League>,
  ) {}
  create(createLeagueDto: CreateLeagueDto) {
    return 'This action adds a new league';
  }

  findAll() {
    return this.leaguaRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} league`;
  }

  update(id: number, updateLeagueDto: UpdateLeagueDto) {
    return `This action updates a #${id} league`;
  }

  remove(id: number) {
    return `This action removes a #${id} league`;
  }
}
