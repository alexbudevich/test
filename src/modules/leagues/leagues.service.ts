import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { League } from './entities/league.entity';
import { paginate, PaginateQuery } from 'nestjs-paginate';

@Injectable()
export class LeaguesService {
  constructor(
    @Inject('LEAGUE_REPOSITORY')
    private repository: Repository<League>,
  ) {}

  findAll(query: PaginateQuery) {
    return paginate(query, this.repository, {
      relations: ['country'],
      sortableColumns: ['id'],
    });
  }

  findOne(id: number) {
    return this.repository.findOne({
      where: {
        id: id,
      },
      relations: ['country'],
    });
  }
}
