import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Match } from './entities/match.entity';
import { paginate, PaginateQuery } from 'nestjs-paginate';

@Injectable()
export class MatchesService {
  constructor(
    @Inject('MATCH_REPOSITORY')
    private repository: Repository<Match>,
  ) {}

  findAll(query: PaginateQuery) {
    return paginate(query, this.repository, {
      relations: [
        'odds',
        'league',
        'player_1',
        'player_2',
        'round',
        'teamAway',
        'teamHome',
        'venue',
      ],
      sortableColumns: ['id'],
    });
  }

  findOne(id: number) {
    return this.repository.findOne({
      where: { id: id },
      relations: [
        'odds',
        'league',
        'player_1',
        'player_2',
        'round',
        'teamAway',
        'teamHome',
        'venue',
      ],
    });
  }
}
