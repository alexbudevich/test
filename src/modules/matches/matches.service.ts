import { Inject, Injectable } from '@nestjs/common';
import { Between, Repository } from 'typeorm';
import { Match } from './entities/match.entity';
import { paginate, PaginateQuery } from 'nestjs-paginate';
import { MatchCriteriaDto } from './dto/match-criteria.dto';
import { OrderType } from './dto/query.dto';
import axios from 'axios';
import { RapidApiResponses } from '../../common/rapid-api.response';

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

  private topCountries: string[] = [
    'World',
    'England',
    'Spain',
    'Italy',
    'Germany',
    'France',
    'Brazil',
    'Austria',
    'Portugal',
    'Belgium',
  ];
  constructor(
    @Inject('MATCH_REPOSITORY')
    private repository: Repository<Match>,
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

  async findOne(id: number) {
    const match = await this.repository.findOne({
      where: { id: id },
    });

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

    return this.repository.findOne({
      relations: ['teamAway', 'teamHome', 'league', 'round'],
      where: { id: id },
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

    if (criteria.leagueId) {
      matchQueryBuilder.andWhere('match.league.id = :id', {
        id: criteria.leagueId,
      });
    }

    if (criteria.countryId) {
      matchQueryBuilder.andWhere('country.id = :id', {
        id: criteria.countryId,
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
      matchQueryBuilder.andWhere('league.name in (:...leagues)', {
        leagues: this.topLeagues,
      });
      matchQueryBuilder.andWhere('country.name in (:...countries)', {
        countries: this.topCountries,
      });
    }

    return matchQueryBuilder;
  }
}
