import { Injectable, NotFoundException } from '@nestjs/common';
import { Between, LessThan, MoreThan, Repository } from 'typeorm';
import { BasketballMatch } from './entities/basketball-match.entity';
import { paginate, PaginateQuery } from 'nestjs-paginate';
import { MatchCriteriaDto } from './dto/match-criteria.dto';
import { OrderType } from '../../../common/dto/query.dto';
import { BasketballLeague } from '../leagues/entities/basketball-league.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Country } from '../../countries/entities/country.entity';
import { SportType } from '../../../common/entities/sport-type.entity';
import { TeamMatchDto } from './dto/team-match.dto';

@Injectable()
export class BasketballMatchesService {
  private topLeagues: string[] = [
    'World Cup 2022',
    'Premier League',
    'La Liga',
    'Serie A',
    'Bundesliga',
    'Ligue 1',
    'Serie A',
    'Bundesliga',
    'Primeira Liga',
    'Jupiler Pro League',
    'UEFA Champions League',
    'Serie B',
    'Serie C',
    'Serie D',
    'Championship',
    'CONCACAF Champions League',
    'CONCACAF League',
    'CONMEBOL Libertadores',
    'Copa America',
    'UEFA Europa League',
    'FA Cup',
    'UEFA Europa Conference League',
    'Copa Do Brasil',
  ];

  constructor(
    @InjectRepository(BasketballMatch)
    private repository: Repository<BasketballMatch>,
    @InjectRepository(Country)
    private countryRepository: Repository<Country>,
    @InjectRepository(BasketballLeague)
    private leagueRepository: Repository<BasketballLeague>,
    @InjectRepository(SportType)
    private sportRepository: Repository<SportType>,
  ) {}

  async searchMatchByCriteria(
    query: PaginateQuery,
    criteria: MatchCriteriaDto,
  ) {
    await this.checkFor404Error(criteria);

    const matchCriteria = await this.getMatchCriteria(criteria);

    const matches = await paginate(query, matchCriteria, {
      relations: ['teamAway', 'teamHome'],
      sortableColumns: ['date'],
      defaultSortBy: [['date', OrderType.DESC]],
    });

    matches.data.map((match) => {
      match.league = { ...match.league, standings: null };
    });

    return matches;
  }

  private readonly BASKETBALL_SLUG = 'basketball';

  async getBySlug(match: string) {
    let matchEntity = await this.repository.findOne({
      where: {
        slug: match,
        sport: {
          slug: this.BASKETBALL_SLUG,
        },
        isLive: true,
      },
    });

    if (!matchEntity) {
      const currentDate = new Date();
      const dateInPast = new Date();
      dateInPast.setDate(dateInPast.getDate() - 1);
      const matchBefore = await this.repository.findOne({
        where: {
          slug: match,
          sport: {
            slug: this.BASKETBALL_SLUG,
          },
          date: Between(dateInPast, currentDate),
        },
        order: {
          date: 'DESC',
        },
      });
      const matchAfter = await this.repository.findOne({
        where: {
          slug: match,
          sport: {
            slug: this.BASKETBALL_SLUG,
          },
          date: MoreThan(currentDate),
        },
        order: {
          date: 'ASC',
        },
      });

      if (matchAfter || matchBefore) {
        if (matchAfter && matchBefore) {
          const timeMatchBefore =
            currentDate.valueOf() - matchBefore.date.valueOf();
          const timeMatchAfter =
            matchAfter.date.valueOf() - currentDate.valueOf();
          matchEntity =
            timeMatchBefore < timeMatchAfter ? matchBefore : matchAfter;
        } else {
          if (!matchAfter) {
            matchEntity = matchBefore;
          } else {
            matchEntity = matchAfter;
          }
        }
      } else {
        matchEntity = await this.repository.findOne({
          where: {
            slug: match,
            sport: {
              slug: this.BASKETBALL_SLUG,
            },
            date: LessThan(currentDate),
          },
          order: {
            date: 'DESC',
          },
        });
      }
    }

    if (!matchEntity) {
      throw new NotFoundException();
    }

    return this.repository.findOne({
      relations: ['teamAway', 'teamHome', 'league', 'round'],
      where: { id: matchEntity.id },
    });
  }

  async getMatchesByTeam(
    team: string,
    query: PaginateQuery,
    criteria: TeamMatchDto,
  ) {
    const matchQueryBuilder = this.repository
      .createQueryBuilder('match')
      .leftJoinAndSelect('match.teamHome', 'teamHome')
      .leftJoinAndSelect('match.teamAway', 'teamAway')
      .where('teamHome.slug = :teamHome', { teamHome: team })
      .orWhere('teamAway.slug = :teamAway', { teamAway: team });

    criteria.latestThen &&
      matchQueryBuilder.andWhere('match.date <: :lessDate', {
        lessDate: criteria.latestThen,
      });

    criteria.latestThen &&
      matchQueryBuilder.andWhere('match.date >: :grateDate', {
        grateDate: criteria.greatestThen,
      });

    return await paginate(query, matchQueryBuilder, {
      sortableColumns: ['date'],
      defaultSortBy: [['date', OrderType.DESC]],
    });
  }

  private async getMatchCriteria(criteria: MatchCriteriaDto) {
    const matchQueryBuilder = this.repository
      .createQueryBuilder('match')
      .leftJoinAndSelect('match.league', 'league')
      .leftJoinAndSelect('league.country', 'country')
      .where('true');

    if (criteria.dateFrom && criteria.dateTo) {
      criteria.dateFrom.setHours(0, 0, 0);
      criteria.dateTo.setHours(23, 59, 59);
      matchQueryBuilder.andWhere({
        date: Between(
          criteria.dateFrom.toLocaleString(),
          criteria.dateTo.toLocaleString(),
        ),
      });
    }

    if (criteria.league) {
      matchQueryBuilder.andWhere('league.slug = :leagueSlug', {
        leagueSlug: criteria.league,
      });
    }

    if (criteria.country) {
      matchQueryBuilder.andWhere('country.slug = :countrySlug', {
        countrySlug: criteria.country,
      });
    }

    if (criteria.isLive) {
      matchQueryBuilder.andWhere('match.isLive = :isLive', {
        isLive: criteria.isLive,
      });
    }

    if (criteria.statusShort && criteria.statusShort.length !== 0) {
      matchQueryBuilder.andWhere('match.statusShort in (:...statusShort)', {
        statusShort: criteria.statusShort,
      });
    }

    if (criteria.isTop) {
      matchQueryBuilder
        .addSelect(
          `case when league.name IN (:...topLeagues) then 0 else 1 end`,
          '_rank',
        )
        .setParameter('topLeagues', this.topLeagues)
        .orderBy('_rank', 'ASC');
    }

    if (criteria.sport) {
      matchQueryBuilder
        .leftJoin('match.sport', 'sport')
        .andWhere('sport.slug = :sport', { sport: criteria.sport });
    }

    return matchQueryBuilder;
  }

  private async checkFor404Error(criteria: MatchCriteriaDto) {
    if (criteria.sport) {
      const sport = await this.sportRepository.findOne({
        where: {
          slug: criteria.sport,
        },
      });
      if (!sport) {
        throw new NotFoundException('sport');
      }
    }

    if (criteria.country || criteria.league) {
      if (criteria.country && criteria.league) {
        const leagueCountry = await this.leagueRepository
          .createQueryBuilder('league')
          .leftJoin('league.country', 'country')
          .where('league.slug = :leagueSlug', { leagueSlug: criteria.league })
          .andWhere('country.slug = :countrySlug', {
            countrySlug: criteria.country,
          })
          .getOne();
        if (!leagueCountry) {
          throw new NotFoundException('leagueCountry');
        }
      } else {
        if (criteria.country) {
          const country = await this.countryRepository.findOne({
            where: {
              slug: criteria.country,
            },
          });
          if (!country) {
            throw new NotFoundException('country');
          }
        } else {
          const league = await this.leagueRepository.findOne({
            where: {
              slug: criteria.league,
            },
          });
          if (!league) {
            throw new NotFoundException('league');
          }
        }
      }
    }
  }
}
