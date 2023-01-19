import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { paginate, PaginateQuery } from 'nestjs-paginate';
import { Country } from './entities/country.entity';
import { InjectRepository } from '@nestjs/typeorm';

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
    @InjectRepository(Country)
    private repository: Repository<Country>,
  ) {}

  findByCriteria(query: PaginateQuery) {
    return paginate(query, this.repository, {
      sortableColumns: ['id'],
    });
  }

  getById(id: number) {
    return this.repository.findOneBy({ id });
  }

  getBySlug(slug: string) {
    return this.repository.findOneBy({ slug });
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
