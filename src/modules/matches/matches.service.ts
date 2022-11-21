import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
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
    });
  }

  findOne(id: number) {
    return this.repository.findOne({
      relations: ['teamAway', 'teamHome'],
      where: { id: id },
    });
  }

  private async getMatchCriteria(criteria: MatchCriteriaDto) {
    return this.repository.createQueryBuilder('match');
  }
}
