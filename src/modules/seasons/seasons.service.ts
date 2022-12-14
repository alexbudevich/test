import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Season } from './entities/season.entity';
import { paginate, PaginateQuery } from 'nestjs-paginate';

@Injectable()
export class SeasonsService {
  constructor(
    @Inject('SEASON_REPOSITORY')
    private repository: Repository<Season>,
  ) {}

  findAll(query: PaginateQuery) {
    return paginate(query, this.repository, {
      sortableColumns: ['id'],
    });
  }

  getById(id: number) {
    return this.repository.findOneBy({ id: id });
  }

  getBySlug(slug: string) {
    return this.repository.findOneBy({ slug });
  }
}
