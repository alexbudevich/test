import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { League } from './entities/league.entity';
import { paginate, PaginateQuery } from 'nestjs-paginate';
import { InjectRepository } from '@nestjs/typeorm';

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
    private repository: Repository<League>,
  ) {}

  async findAll(query: PaginateQuery) {
    const leagues1 = await this.repository
      .createQueryBuilder('league')
      .leftJoinAndSelect('league.matches', 'match')
      .where('match.date <= NOW() + 30')
      .getMany();

    const leagues = await paginate(query, this.repository, {
      relations: ['country'],
      sortableColumns: ['prior'],
    });

    leagues.data = leagues.data.map((league) => {
      return { ...league, standings: null, description: null };
    });
    return leagues;
  }

  getById(id: number) {
    return this.repository.findOne({
      where: { id },
      relations: ['country'],
    });
  }

  getBySlug(country: string, league: string) {
    return this.repository
      .createQueryBuilder('league')
      .leftJoinAndSelect('league.country', 'country')
      .where('league.slug = :leagueSlug', {
        leagueSlug: league,
      })
      .andWhere('country.slug = :countrySlug', {
        countrySlug: country,
      })
      .getOne();
  }

  async findTopLeagues() {
    const leagues = await this.repository
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
}
