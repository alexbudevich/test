import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Odd } from './entities/odd.entity';
import { paginate, PaginateQuery } from 'nestjs-paginate';

@Injectable()
export class OddsService {
  constructor(
    @Inject('ODD_REPOSITORY')
    private repository: Repository<Odd>,
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
