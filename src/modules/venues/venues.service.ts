import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Venue } from './entities/venue.entity';
import { paginate, PaginateQuery } from 'nestjs-paginate';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class VenuesService {
  constructor(
    @InjectRepository(Venue)
    private repository: Repository<Venue>,
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
