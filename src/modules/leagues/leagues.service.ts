import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { League } from './entities/league.entity';
import { paginate, PaginateQuery } from 'nestjs-paginate';

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
    @Inject('LEAGUE_REPOSITORY')
    private repository: Repository<League>,
  ) {}

  findAll(query: PaginateQuery) {
    return paginate(query, this.repository, {
      relations: ['country'],
      sortableColumns: ['id'],
    });
  }

  findOne(id: number) {
    return this.repository.findOne({
      where: {
        id: id,
      },
      relations: ['country'],
    });
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
