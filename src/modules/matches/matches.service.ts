import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Between, LessThan, MoreThan, Repository } from 'typeorm';
import { Match } from './entities/match.entity';
import { paginate, PaginateQuery } from 'nestjs-paginate';
import { MatchCriteriaDto } from './dto/match-criteria.dto';
import { OrderType } from './dto/query.dto';
import axios from 'axios';
import { RapidApiResponses } from '../../common/rapid-api.response';
import { Country } from '../countries/entities/country.entity';
import { League } from '../leagues/entities/league.entity';
import { SportType } from '../sports/entities/sport-type.entity';

@Injectable()
export class MatchesService {
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
    @Inject('MATCH_REPOSITORY')
    private repository: Repository<Match>,
    @Inject('COUNTRY_REPOSITORY')
    private countryRepository: Repository<Country>,
    @Inject('LEAGUE_REPOSITORY')
    private leagueRepository: Repository<League>,
    @Inject('SPORT_REPOSITORY')
    private sportTypeRepository: Repository<SportType>,
  ) {}

  async searchMatchByCriteria(
    query: PaginateQuery,
    criteria: MatchCriteriaDto,
  ) {
    await this.checkFor404Error(criteria);

    const matchCriteria = await this.getMatchCriteria(criteria);

    const matches = await paginate(query, matchCriteria, {
      relations: ['teamAway', 'teamHome', 'round'],
      sortableColumns: ['date'],
      defaultSortBy: [['date', OrderType.DESC]],
    });

    matches.data.map((match) => {
      match.league = { ...match.league, standings: null };
    });

    return matches;
  }

  async getById(id: number) {
    const match = await this.repository.findOne({
      where: { id: id },
    });

    await this.updateStatistic(match);

    return this.repository.findOne({
      relations: ['teamAway', 'teamHome', 'league', 'round'],
      where: { id: id },
    });
  }

  async getBySlug(sportSlug: string, matchSlug: string) {
    let match = await this.repository.findOne({
      where: {
        slug: matchSlug,
        sportType: {
          slug: sportSlug,
        },
        isLive: true,
      },
    });

    if (!match) {
      const currentDate = new Date();
      const dateInPast = new Date();
      dateInPast.setDate(dateInPast.getDate() - 1);
      const matchBefore = await this.repository.findOne({
        where: {
          slug: matchSlug,
          sportType: {
            slug: sportSlug,
          },
          date: Between(dateInPast, currentDate),
        },
        order: {
          date: 'DESC',
        },
      });
      const matchAfter = await this.repository.findOne({
        where: {
          slug: matchSlug,
          sportType: {
            slug: sportSlug,
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
          match = timeMatchBefore < timeMatchAfter ? matchBefore : matchAfter;
        } else {
          if (!matchAfter) {
            match = matchBefore;
          } else {
            match = matchAfter;
          }
        }
      } else {
        match = await this.repository.findOne({
          where: {
            slug: matchSlug,
            sportType: {
              slug: sportSlug,
            },
            date: LessThan(currentDate),
          },
          order: {
            date: 'DESC',
          },
        });
      }
    }

    if (!match) {
      throw new NotFoundException();
    }

    await this.updateStatistic(match);

    return this.repository.findOne({
      relations: ['teamAway', 'teamHome', 'league', 'round'],
      where: { id: match.id },
    });
  }

  private async updateStatistic(match: Match) {
    try {
      if (match) {
        const axiosResponse = await axios.get(
          'https://api-football-v1.p.rapidapi.com/v3/fixtures?id=' +
            match.providerId,
          {
            headers: {
              'x-rapidapi-host': process.env.RHOST,
              'x-rapidapi-key': process.env.RKEY,
            },
          },
        );

        if (
          axiosResponse.data &&
          (axiosResponse.data
            .response as RapidApiResponses.Fixtures.Fixtures.Response[])
        ) {
          const fixtures = axiosResponse.data
            .response as RapidApiResponses.Fixtures.Fixtures.Response[];
          for (const fixture of fixtures) {
            const events = fixture.events;
            if (events) {
              match.statistics = JSON.parse(JSON.stringify(events));
              await this.repository.save(match);
              break;
            }
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
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
        .leftJoin('match.sportType', 'sportType')
        .andWhere('sportType.slug = :sportType', { sportType: criteria.sport });
    }

    return matchQueryBuilder;
  }

  private async checkFor404Error(criteria: MatchCriteriaDto) {
    if (criteria.sport) {
      const sportType = await this.sportTypeRepository.findOne({
        where: {
          slug: criteria.sport,
        },
      });
      if (!sportType) {
        throw new NotFoundException('sportType');
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
