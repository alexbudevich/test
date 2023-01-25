import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { paginate, PaginateQuery } from 'nestjs-paginate';
import { InjectRepository } from '@nestjs/typeorm';
import { BasketballTeam } from './entities/basketball-team.entity';

@Injectable()
export class BasketballTeamsService {
  constructor(
    @InjectRepository(BasketballTeam)
    private repository: Repository<BasketballTeam>,
  ) {}

  findAll(query: PaginateQuery) {
    return paginate(query, this.repository, {
      relations: ['players'],
      sortableColumns: ['id'],
    });
  }

  getById(id: number) {
    return this.repository.findOne({
      where: {
        id: id,
      },
      relations: ['players'],
    });
  }

  getBySlug(slug: string) {
    return this.repository.findOne({
      where: {
        slug,
      },
      relations: ['players'],
    });
  }
}
