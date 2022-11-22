import { Inject, Injectable } from '@nestjs/common';
import { Between, Repository } from 'typeorm';
import { Match } from './entities/match.entity';
import { paginate, PaginateQuery } from 'nestjs-paginate';
import { MatchCriteriaDto } from './dto/match-criteria.dto';

@Injectable()
export class MatchesService {
  constructor(
    @Inject('MATCH_REPOSITORY')
    private repository: Repository<Match>,
  ) {}

  async searchMatchByCriteria(
    query: PaginateQuery,
    criteria: MatchCriteriaDto,
  ) {
    const matchCriteria = await this.getMatchCriteria(criteria);

    return paginate(query, matchCriteria, {
      relations: ['teamAway', 'teamHome'],
      sortableColumns: ['date'],
      defaultSortBy: [['date', 'DESC']],
    });
  }

  findOne(id: number) {
    return this.repository.findOne({
      relations: ['teamAway', 'teamHome'],
      where: { id: id },
    });
  }

  private async getMatchCriteria(criteria: MatchCriteriaDto) {
    const matchQueryBuilder = this.repository.createQueryBuilder('match');

    if (criteria.dateFrom && criteria.dateTo) {
      criteria.dateFrom.setHours(0, 0, 0);
      criteria.dateTo.setHours(23, 59, 59);
      matchQueryBuilder.where({
        date: Between(
          criteria.dateFrom.toLocaleString(),
          criteria.dateTo.toLocaleString(),
        ),
      });
    }

    return matchQueryBuilder;
  }
}
