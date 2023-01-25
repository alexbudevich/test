import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { paginate, PaginateQuery } from 'nestjs-paginate';
import { PlayerCriteriaDto } from './dto/player-criteria.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BasketballPlayer } from './entities/basketball-player.entity';

@Injectable()
export class BasketballPlayersService {
  constructor(
    @InjectRepository(BasketballPlayer)
    private repository: Repository<BasketballPlayer>,
  ) {}

  async searchPlayerByCriteria(query: PaginateQuery, type: PlayerCriteriaDto) {
    const tournamentsCriteria = await this.getPlayerCriteria(type);

    return paginate(query, tournamentsCriteria, {
      sortableColumns: ['id'],
    });
  }

  getById(id: number) {
    return this.repository.findOneBy({ id: id });
  }

  getBySlug(slug: string) {
    return this.repository.findOneBy({ slug });
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
