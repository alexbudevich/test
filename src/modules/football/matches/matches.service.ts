import { Injectable, NotFoundException } from '@nestjs/common';
import { Between, LessThan, MoreThan, Repository } from 'typeorm';
import { Match } from './entities/match.entity';
import { paginate, PaginateQuery } from 'nestjs-paginate';
import { OrderType } from './dto/query.dto';
import axios from 'axios';
import { RapidApiResponses } from '../../../common/rapid-api.response';
import { Country } from '../../countries/entities/country.entity';
import { League } from '../leagues/entities/league.entity';
import { SportType } from '../../../common/entities/sport-type.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MatchCriteriaDto } from '../../../common/dto/match-criteria.dto';
import { TeamMatchDto } from '../../basketball/matches/dto/team-match.dto';

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
    @InjectRepository(Match)
    private repository: Repository<Match>,
    @InjectRepository(Country)
    private countryRepository: Repository<Country>,
    @InjectRepository(League)
    private leagueRepository: Repository<League>,
    @InjectRepository(SportType)
    private sportTypeRepository: Repository<SportType>,
  ) {}

  async searchMatchByCriteria(
    query: PaginateQuery,
    criteria: MatchCriteriaDto,
  ) {
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

  async getBySlug(matchSlug: string) {
    let match = await this.repository.findOne({
      where: {
        slug: matchSlug,
        sportType: {
          slug: 'football',
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
            slug: 'football',
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
            slug: 'football',
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
              slug: 'football',
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

    const matchEntity = await this.repository
      .createQueryBuilder('match')
      .leftJoinAndSelect('match.teamAway', 'teamAway')
      .leftJoinAndSelect('match.teamHome', 'teamHome')
      .leftJoinAndSelect('match.round', 'round')
      .leftJoinAndSelect('match.venue', 'venue')
      .leftJoinAndSelect('match.league', 'league')
      .where('match.id = :id', { id: match.id })
      .getOne();

    matchEntity.league = await this.leagueRepository
      .createQueryBuilder('league')
      .leftJoinAndSelect('league.country', 'country')
      .select(['league.standings', 'league.description'])
      .where('league.id = :id', {
        id: matchEntity.league.id,
      })
      .getOne();

    return matchEntity;
  }

  private async updateStatistic(match: Match) {
    try {
      if (match) {
        const axiosResponse = await axios.get(
          'https://v3.football.api-sports.io/fixtures?id=' + match.providerId,
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
      matchQueryBuilder.andWhere(
        'CAST(match.date as date) BETWEEN CAST(:dateFrom as date) AND CAST(:dateTo as date)',
        {
          dateFrom: criteria.dateFrom,
          dateTo: criteria.dateTo,
        },
      );
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

  async getMatchesByTeam(
    team: string,
    query: PaginateQuery,
    criteria: TeamMatchDto,
  ) {
    const matchQueryBuilder = this.repository
      .createQueryBuilder('match')
      .leftJoinAndSelect('match.teamHome', 'teamHome')
      .leftJoinAndSelect('match.teamAway', 'teamAway')
      .leftJoinAndSelect('match.league', 'league')
      .leftJoinAndSelect('league.country', 'country')
      .where('(teamHome.slug = :teamHome OR teamAway.slug = :teamAway)', {
        teamHome: team,
        teamAway: team,
      });

    criteria.latestThen &&
      matchQueryBuilder.andWhere('match.date <= :latestThen', {
        latestThen: criteria.latestThen,
      });

    criteria.greatestThen &&
      matchQueryBuilder.andWhere('match.date >= :greatestThen', {
        greatestThen: criteria.greatestThen,
      });

    return await paginate(query, matchQueryBuilder, {
      sortableColumns: ['date'],
      defaultSortBy: [['date', OrderType.DESC]],
    });
  }

  async getMatchesBySlugAndDate(
    match: string,
    query: PaginateQuery,
    criteria: TeamMatchDto,
  ) {
    const matchQueryBuilder = this.repository
      .createQueryBuilder('match')
      .leftJoinAndSelect('match.teamHome', 'teamHome')
      .leftJoinAndSelect('match.teamAway', 'teamAway')
      .leftJoinAndSelect('match.league', 'league')
      .leftJoinAndSelect('league.country', 'country')
      .leftJoinAndSelect('match.round', 'round')
      .leftJoinAndSelect('match.venue', 'venue')
      .where('(match.slug = :match)', {
        match: match,
      });

    criteria.latestThen &&
      matchQueryBuilder.andWhere('match.date <= :latestThen', {
        latestThen: criteria.latestThen,
      });

    criteria.greatestThen &&
      matchQueryBuilder.andWhere('match.date >= :greatestThen', {
        greatestThen: criteria.greatestThen,
      });

    return await paginate(query, matchQueryBuilder, {
      sortableColumns: ['date'],
      defaultSortBy: [['date', OrderType.DESC]],
    });
  }
}
