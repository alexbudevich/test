import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Team } from './entities/team.entity';
import { paginate, PaginateQuery } from 'nestjs-paginate';

@Injectable()
export class TeamsService {
  constructor(
    @Inject('TEAM_REPOSITORY')
    private repository: Repository<Team>,
  ) {}

  findAll(query: PaginateQuery) {
    return paginate(query, this.repository, {
      relations: ['awayMatches', 'homeMatches', 'players'],
      sortableColumns: ['id'],
    });
  }

  findOne(id: number) {
    return this.repository.findOne({
      where: {
        id: id,
      },
      relations: ['awayMatches', 'homeMatches', 'players'],
    });
  }
}
