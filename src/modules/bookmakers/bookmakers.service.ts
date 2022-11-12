import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Bookmaker } from './entities/bookmaker.entity';
import { paginate, PaginateQuery } from 'nestjs-paginate';

@Injectable()
export class BookmakersService {
  constructor(
    @Inject('BOOKMAKER_REPOSITORY')
    private repository: Repository<Bookmaker>,
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
