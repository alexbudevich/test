import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Odd } from './entities/odd.entity';
import { paginate, PaginateQuery } from 'nestjs-paginate';
import { OddCriteriaDto } from './dto/odd-criteria.dto';
import { MatchesService } from '../matches/matches.service';
import { Bookmaker } from '../bookmakers/entities/bookmaker.entity';

@Injectable()
export class OddsService {
  constructor(
    @Inject('ODD_REPOSITORY')
    private repository: Repository<Odd>,
    @Inject('BOOKMAKER_REPOSITORY')
    private bookmakerRepository: Repository<Bookmaker>,
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

    if (criteria.bookmaker) {
      oddQueryBuilder.where('odd.bookmaker.slug = :bookmaker', {
        bookmaker: criteria.bookmaker,
      });
    }
    return oddQueryBuilder;
  }

  async getMatchOdds(sport: string, match: string) {
    const matchEntity = await this.matchesService.getBySlug(sport, match);

    return await this.bookmakerRepository.find({
      relations: ['odds'],
      where: {
        odds: {
          matchId: matchEntity.id,
        },
      },
    });
  }

}
