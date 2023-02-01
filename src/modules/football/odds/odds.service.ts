import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Odd } from './entities/odd.entity';
import { paginate, PaginateQuery } from 'nestjs-paginate';
import { OddCriteriaDto } from './dto/odd-criteria.dto';
import { MatchesService } from '../matches/matches.service';
import { InjectRepository } from '@nestjs/typeorm';
import { FootballBookmakerEntity } from '../../bookmakers/entities/football-bookmaker.entity';

@Injectable()
export class OddsService {
  constructor(
    @InjectRepository(Odd)
    private repository: Repository<Odd>,
    @InjectRepository(FootballBookmakerEntity)
    private bookmakerRepository: Repository<FootballBookmakerEntity>,
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
    const oddQueryBuilder = this.repository
      .createQueryBuilder('odd')
      .leftJoin('odd.bookmaker', 'bookmaker');

    if (criteria.bookmaker) {
      oddQueryBuilder.where('bookmaker.slug = :bookmaker', {
        bookmaker: criteria.bookmaker,
      });
    }
    return oddQueryBuilder;
  }

  async getMatchOdds(query: PaginateQuery, match: string) {
    const matchEntity = await this.matchesService.getBySlug(match);

    const bookmakerSelectQueryBuilder = this.bookmakerRepository
      .createQueryBuilder('bookmaker')
      .leftJoinAndSelect('bookmaker.odds', 'odd')
      .leftJoin('odd.match', 'match')
      .where('match.id = :matchId', { matchId: matchEntity.id });

    return paginate(query, bookmakerSelectQueryBuilder, {
      sortableColumns: ['rank'],
    });
  }

  async getTopMatchOdds(match: string) {
    const matchEntity = await this.matchesService.getBySlug(match);

    const oddSelectQueryBuilder = this.getTopOddSelectQueryBuilder();

    const oddHome = await oddSelectQueryBuilder
      .setParameter('matchId', matchEntity.id)
      .setParameter('value', 'Home')
      .getOne();

    const oddDraw = await oddSelectQueryBuilder
      .setParameter('matchId', matchEntity.id)
      .setParameter('value', 'Draw')
      .getOne();

    const oddAway = await oddSelectQueryBuilder
      .setParameter('matchId', matchEntity.id)
      .setParameter('value', 'Away')
      .getOne();

    return [oddHome, oddDraw, oddAway];
  }

  private getTopOddSelectQueryBuilder() {
    return this.repository
      .createQueryBuilder('odd')
      .leftJoinAndSelect('odd.bookmaker', 'bookmaker')
      .leftJoin(
        (qb) =>
          qb
            .select([
              'od1.value as od1_value',
              'od1.match_id',
              'max(od1.odd) as MaxOdd',
            ])
            .from(Odd, 'od1')
            .groupBy('od1.value')
            .where('od1.match_id = :matchId')
            .addGroupBy('od1.match_id'),
        'od1',
        'odd.match_id = od1.match_id and odd.value=od1_value and odd.odd=od1.MaxOdd',
      )
      .where('odd.match_id = :matchId')
      .andWhere('odd.value= :value')
      .andWhere('odd.odd = od1.MaxOdd')
      .orderBy('bookmaker.rank');
  }
}
