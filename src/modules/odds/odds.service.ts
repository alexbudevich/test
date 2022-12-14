import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Odd } from './entities/odd.entity';
import { paginate, PaginateQuery } from 'nestjs-paginate';
import { OddCriteriaDto } from './dto/odd-criteria.dto';
import { MatchesService } from '../matches/matches.service';

@Injectable()
export class OddsService {
  constructor(
    @Inject('ODD_REPOSITORY')
    private repository: Repository<Odd>,
    private matchesService: MatchesService,
  ) {}

  async searchOddByCriteria(query: PaginateQuery, criteria: OddCriteriaDto) {
    const matchCriteria = await this.getOddCriteria(criteria);

    return paginate(query, matchCriteria, {
      relations: ['match', 'bookmaker'],
      sortableColumns: ['id'],
    });
  }

  betById(id: number) {
    return this.repository.findOne({
      relations: ['match', 'bookmaker'],
      where: { id },
    });
  }

  private async getOddCriteria(criteria: OddCriteriaDto) {
    const oddQueryBuilder = this.repository.createQueryBuilder('odd');

    if (criteria.match) {
      const match = await this.matchesService.getBySlug(criteria.match);
      oddQueryBuilder.where('odd.match.id = :id', { id: match.id });
    }

    if (criteria.bookmaker) {
      oddQueryBuilder.where('odd.bookmaker.slug = :slug', {
        slug: criteria.bookmaker,
      });
    }
    return oddQueryBuilder;
  }
}
