import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Bookmaker } from '../bookmakers/entities/bookmaker.entity';
import { paginate, PaginateQuery } from 'nestjs-paginate';

@Injectable()
export class CountriesService {
  constructor(
    @Inject('COUNTRY_REPOSITORY')
    private repository: Repository<Bookmaker>,
  ) {}

  findByCriteria(query: PaginateQuery) {
    return paginate(query, this.repository, {
      sortableColumns: ['id'],
    });
  }

  findOne(id: number) {
    return this.repository.findOneBy({ id: id });
  }

  findAll() {
    return this.repository.find();
  }
}
