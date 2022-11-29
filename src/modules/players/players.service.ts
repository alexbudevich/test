import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Player } from './entities/player.entity';
import { paginate, PaginateQuery } from 'nestjs-paginate';
import { PlayerCriteriaDto } from './dto/player-criteria.dto';

@Injectable()
export class PlayersService {
  constructor(
    @Inject('PLAYER_REPOSITORY')
    private repository: Repository<Player>,
  ) {}

  async searchPlayerByCriteria(query: PaginateQuery, type: PlayerCriteriaDto) {
    const tournamentsCriteria = await this.getPlayerCriteria(type);

    return paginate(query, tournamentsCriteria, {
      sortableColumns: ['id'],
    });
  }

  findOne(id: number) {
    return this.repository.findOneBy({ id: id });
  }

  private async getPlayerCriteria(search: PlayerCriteriaDto) {
    const playerQueryBuilder = this.repository
      .createQueryBuilder('player')
      .where('true');

    if (search.matchId) {
      playerQueryBuilder
        .leftJoin('player.team', 'team')
        .leftJoin('team.awayMatches', 'awayMatch')
        .leftJoin('team.homeMatches', 'homeMatch')
        .andWhere('awayMatch.id = :id', { id: search.matchId })
        .orWhere('homeMatch.id = :id', { id: search.matchId });
    }

    return playerQueryBuilder;
  }
}
