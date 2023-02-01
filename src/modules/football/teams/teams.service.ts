import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Team } from './entities/team.entity';
import { paginate, PaginateQuery } from 'nestjs-paginate';
import { TeamTopScore } from './dto/team-top-score.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TeamsService {
  constructor(
    @InjectRepository(Team)
    private repository: Repository<Team>,
  ) {}

  findAll(query: PaginateQuery) {
    return paginate(query, this.repository, {
      relations: ['players'],
      sortableColumns: ['id'],
    });
  }

  getById(id: number) {
    return this.repository.findOne({
      where: {
        id: id,
      },
      relations: ['players'],
    });
  }

  getBySlug(slug: string) {
    return this.repository.findOne({
      where: {
        slug,
      },
      relations: ['players'],
    });
  }

  async teamStatistic(id: number) {
    const team: Team = await this.repository
      .createQueryBuilder('team')
      .leftJoinAndSelect('team.players', 'player')
      .leftJoinAndSelect('player.footballStatistics', 'footballStatistic')
      .where({ id: id })
      .getOne();
    if (team) {
      team.teamTopScore = [];
      for (const player of team.players) {
        const teamTopScore = {
          player: { ...player, footballStatistics: null, statistics: null },
          totalMatches: 0,
          goalsAssists: 0,
          goalsTotal: 0,
        } as TeamTopScore;

        player.footballStatistics &&
          player.footballStatistics.length &&
          player.footballStatistics.forEach((statistics) => {
            teamTopScore.totalMatches++;
            teamTopScore.goalsTotal += statistics.goalsTotal
              ? statistics.goalsTotal
              : 0;
            teamTopScore.goalsAssists += statistics.goalsAssists
              ? statistics.goalsAssists
              : 0;
          });

        team.teamTopScore.push(teamTopScore);
      }

      team.players = team.players.map((player) => {
        return { ...player, footballStatistics: null, statistics: null };
      });

      team.teamTopScore.sort((a, b) => b.goalsTotal - a.goalsTotal);
    }

    return team;
  }
}
