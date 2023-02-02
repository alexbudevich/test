import { Injectable } from '@nestjs/common';
import { IsNull, Repository } from 'typeorm';
import { League } from './entities/league.entity';
import { paginate, PaginateQuery } from 'nestjs-paginate';
import { InjectRepository } from '@nestjs/typeorm';
import { CountryFootballEntity } from '../../countries/entities/country-football.entity';

@Injectable()
export class LeaguesService {
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
    @InjectRepository(League)
    private leagueRepository: Repository<League>,
    @InjectRepository(CountryFootballEntity)
    private countryRepository: Repository<CountryFootballEntity>,
  ) {}

  async findAll(query: PaginateQuery) {
    const queryBuilder = await this.leagueRepository
      .createQueryBuilder('league')
      .leftJoin('league.matches', 'match')
      .where(
        "match.date between now() and CAST((now() + INTERVAL '30 days') as date)",
      );

    const leagues = await paginate(query, queryBuilder, {
      relations: ['country'],
      sortableColumns: ['prior'],
    });

    leagues.data = leagues.data.map((league) => {
      return { ...league, standings: null, description: null };
    });
    return leagues;
  }

  getById(id: number) {
    return this.leagueRepository.findOne({
      where: { id },
      relations: ['country'],
    });
  }

  getBySlug(country: string, league: string) {
    return this.leagueRepository
      .createQueryBuilder('league')
      .leftJoinAndSelect('league.country', 'country')
      .select(['league.standings', 'league.description'])
      .where('league.slug = :leagueSlug', {
        leagueSlug: league,
      })
      .andWhere('country.slug = :countrySlug', {
        countrySlug: country,
      })
      .getOne();
  }

  async findTopLeagues() {
    const leagues = await this.leagueRepository
      .createQueryBuilder('league')
      .leftJoinAndSelect('league.country', 'country')
      .where('league.name in (:...leagues)', {
        leagues: this.topLeagues,
      })
      .andWhere('country.name in (:...countries)', {
        countries: this.topCountries,
      })
      .getMany();

    return leagues.map((league) => {
      return { ...league, standings: null };
    });
  }

  async getCountryLeagues() {
    const countryFootballEntities = await this.countryRepository
      .createQueryBuilder('country')
      .leftJoinAndSelect('country.leagues', 'league')
      .leftJoin('league.matches', 'match')
      .getMany();

    countryFootballEntities.map((country) => {
      country.leagues = country.leagues.map((league) => {
        return { ...league, standings: null, description: null };
      });
    });
    return countryFootballEntities;
  }

  async getByCountry(country: string) {
    const basketballLeagues = await this.leagueRepository.find({
      where: {
        country: {
          slug: country,
        },
      },
      order: {
        prior: 'ASC',
      },
    });

    return basketballLeagues.map((league) => {
      return { ...league, standings: null, description: null };
    });
  }
}
