import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Bookmaker } from '../bookmakers/entities/bookmaker.entity';
import { paginate, PaginateQuery } from 'nestjs-paginate';

@Injectable()
export class CountriesService {
  private topCountries: string[] = [
    'World',
    'England',
    'Spain',
    'Italy',
    'Germany',
    'France',
    'Brazil',
    'Austria',
    'Portugal',
    'Belgium',
  ];
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

  async findTopCountries() {
    return await this.repository
      .createQueryBuilder('country')
      .where('country.name in (:...countries)', {
        countries: this.topCountries,
      })
      .getMany();
  }
}
