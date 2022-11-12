import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Player } from './entities/player.entity';
import { paginate, PaginateQuery } from 'nestjs-paginate';

@Injectable()
export class PlayersService {
  constructor(
    @Inject('PLAYER_REPOSITORY')
    private repository: Repository<Player>,
  ) {}

  findAll(query: PaginateQuery) {
    return paginate(query, this.repository, {
      sortableColumns: ['id'],
    });
  }

  findOne(id: number) {
    return this.repository.findOneBy({ id: id });
  }
}
