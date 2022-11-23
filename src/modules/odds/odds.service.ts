import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Odd } from './entities/odd.entity';
import { paginate, PaginateQuery } from 'nestjs-paginate';
import { OddCriteriaDto } from './dto/odd-criteria.dto';
import { BookmakerCriteriaDto } from '../bookmakers/dto/bookmaker-criteria.dto';

@Injectable()
export class OddsService {
  constructor(
    @Inject('ODD_REPOSITORY')
    private repository: Repository<Odd>,
  ) {}

  async searchOddByCriteria(query: PaginateQuery, criteria: OddCriteriaDto) {
    const matchCriteria = await this.getOddCriteria(criteria);

    return paginate(query, matchCriteria, {
      relations: ['match', 'bookmaker'],
      sortableColumns: ['id'],
    });
  }

  findOne(id: number) {
    return this.repository.findOne({
      relations: ['match', 'bookmaker'],
      where: {
        id: id,
      },
    });
  }

  private async getOddCriteria(criteria: OddCriteriaDto) {
    const oddQueryBuilder = this.repository.createQueryBuilder('odd');

    if (criteria.matchId) {
      oddQueryBuilder.where('odd.match.id = :id', { id: criteria.matchId });
    }
    return oddQueryBuilder;
  }
}
