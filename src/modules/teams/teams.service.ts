import {Inject, Injectable} from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import {Repository} from "typeorm";
import {Sport} from "../sports/entities/sport.entity";
import {Team} from "./entities/team.entity";

@Injectable()
export class TeamsService {

  constructor(
      @Inject('TEAM_REPOSITORY')
      private teamRepository: Repository<Team>,
  ) {}
  create(createTeamDto: CreateTeamDto) {
    return 'This action adds a new team';
  }

  findAll() {
    return this.teamRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} team`;
  }

  update(id: number, updateTeamDto: UpdateTeamDto) {
    return `This action updates a #${id} team`;
  }

  remove(id: number) {
    return `This action removes a #${id} team`;
  }
}
