import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Round } from './entities/round.entity';
import { paginate, PaginateQuery } from 'nestjs-paginate';

@Injectable()
export class RoundsService {
  constructor(
    @Inject('ROUND_REPOSITORY')
    private repository: Repository<Round>,
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
