import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Season } from './entities/season.entity';
import { paginate, PaginateQuery } from 'nestjs-paginate';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SeasonsService {
  constructor(
    @InjectRepository(Season)
    private repository: Repository<Season>,
  ) {}

  findAll(query: PaginateQuery) {
    return paginate(query, this.repository, {
      sortableColumns: ['id'],
    });
  }

  getBySlug(slug: string) {
    return this.repository.findOneBy({ slug });
  }
}
