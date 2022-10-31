import {
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Player } from './player.entity';
import { Team } from '../../teams/entities/team.entity';

@Index('team_player_pkey', ['id'], { unique: true })
@Entity('team_player', { schema: 'public' })
export class TeamPlayer {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @ManyToOne(() => Player, (player) => player.teamPlayers)
  @JoinColumn([{ name: 'player_id', referencedColumnName: 'id' }])
  player: Player;

  @ManyToOne(() => Team, (team) => team.teamPlayers)
  @JoinColumn([{ name: 'team_id', referencedColumnName: 'id' }])
  team: Team;
}
