import { Inject, Injectable } from '@nestjs/common';
import { Between, Repository } from 'typeorm';
import { Match } from './entities/match.entity';
import { paginate, PaginateQuery } from 'nestjs-paginate';
import { MatchCriteriaDto } from './dto/match-criteria.dto';
import { OrderType } from './dto/query.dto';

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
      relations: ['teamAway', 'teamHome', 'round'],
      sortableColumns: ['date'],
      defaultSortBy: [['date', OrderType.DESC]],
    });
  }

  findOne(id: number) {
    return this.repository.findOne({
      relations: ['teamAway', 'teamHome', 'league', 'round'],
      where: { id: id },
    });
  }

  private async getMatchCriteria(criteria: MatchCriteriaDto) {
    const matchQueryBuilder = this.repository
      .createQueryBuilder('match')
      .leftJoinAndSelect('match.league', 'league')
      .leftJoinAndSelect('league.country', 'country');

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

    if (criteria.leagueId) {
      matchQueryBuilder.where('match.league.id = :id', {
        id: criteria.leagueId,
      });
    }

    return matchQueryBuilder;
  }
}
