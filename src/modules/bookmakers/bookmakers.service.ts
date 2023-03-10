import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Bookmaker } from './entities/bookmaker.entity';
import { paginate, PaginateQuery } from 'nestjs-paginate';
import { BookmakerCriteriaDto } from './dto/bookmaker-criteria.dto';

@Injectable()
export class BookmakersService {
  constructor(
    @Inject('BOOKMAKER_REPOSITORY')
    private repository: Repository<Bookmaker>,
  ) {}

  async searchBookmakerByCriteria(
    query: PaginateQuery,
    criteria: BookmakerCriteriaDto,
  ) {
    const matchCriteria = await this.getBookmakerCriteria(criteria);

    return paginate(query, matchCriteria, {
      sortableColumns: ['rank'],
    });
  }

  getById(id: number) {
    return this.repository
      .createQueryBuilder('bookmaker')
      .addSelect('bookmaker.description')
      .where('bookmaker.id = :id', { id })
      .getOne();
  }

  getBySlug(slug: string) {
    return this.repository
      .createQueryBuilder('bookmaker')
      .addSelect('bookmaker.description')
      .where('bookmaker.slug = :slug', { slug })
      .getOne();
  }

  private async getBookmakerCriteria(criteria: BookmakerCriteriaDto) {
    return this.repository.createQueryBuilder('bookmaker');
  }
}
