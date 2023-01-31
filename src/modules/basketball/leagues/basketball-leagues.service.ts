import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { BasketballLeague } from './entities/basketball-league.entity';
import { paginate, PaginateQuery } from 'nestjs-paginate';
import { InjectRepository } from '@nestjs/typeorm';
import {CountryFootballEntity} from "../../countries/entities/country-football.entity";
import {CountryBasketballEntity} from "../../countries/entities/country-basketball.entity";

@Injectable()
export class BasketballLeaguesService {
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
    @InjectRepository(BasketballLeague)
    private repository: Repository<BasketballLeague>,

    @InjectRepository(CountryBasketballEntity)
    private countryRepository: Repository<CountryBasketballEntity>,
  ) {}

  async findAll(query: PaginateQuery) {
    const queryBuilder = await this.repository
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

  getBySlug(country: string, league: string) {
    return this.repository
      .createQueryBuilder('league')
      .leftJoinAndSelect('league.country', 'country')
      .where('league.slug = :league', {
        league: league,
      })
      .andWhere('country.slug = :country', {
        country: country,
      })
      .getOne();
  }

  async getCountryLeagues() {
    const countryFootballEntities = await this.countryRepository.find({
      order: {
        name: 'ASC',
      },
      relations: ['leagues'],
    });
    countryFootballEntities.map((country) => {
      country.leagues = country.leagues.map((league) => {
        return { ...league, standings: null, description: null };
      });
    });
    return countryFootballEntities;
  }
}
