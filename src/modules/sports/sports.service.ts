import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Sport } from './entities/sport.entity';
import { paginate, PaginateQuery } from 'nestjs-paginate';

@Injectable()
export class SportsService {
  constructor(
    @Inject('SPORT_REPOSITORY')
    private repository: Repository<Sport>,
  ) {}

  findAll(query: PaginateQuery) {
    return paginate(query, this.repository, {
      sortableColumns: ['id'],
    });
  }

  findOne(id: number) {
    return this.repository.findOneBy({ id: id });
  }
}
