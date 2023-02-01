import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Round } from './entities/round.entity';
import { paginate, PaginateQuery } from 'nestjs-paginate';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RoundsService {
  constructor(
    @InjectRepository(Round)
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
