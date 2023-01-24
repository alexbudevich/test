import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Bookmaker } from './entities/bookmaker.entity';
import { paginate, PaginateQuery } from 'nestjs-paginate';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BookmakersService {
  constructor(
    @InjectRepository(Bookmaker)
    private repository: Repository<Bookmaker>,
  ) {}

  async findAll(query: PaginateQuery) {
    return paginate(query, this.repository, {
      sortableColumns: ['rank'],
    });
  }

  getBySlug(slug: string) {
    return this.repository
      .createQueryBuilder('bookmaker')
      .addSelect('bookmaker.description')
      .where('bookmaker.slug = :slug', { slug })
      .getOne();
  }
}
