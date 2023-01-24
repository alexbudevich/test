import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { League } from '../../modules/leagues/entities/league.entity';
import { Odd } from '../../modules/odds/entities/odd.entity';
import { Player } from '../../modules/players/entities/player.entity';
import { Team } from '../../modules/teams/entities/team.entity';
import { Match } from '../../modules/matches/entities/basketball-match.entity';

@Index('sport_pkey', ['id'], { unique: true })
@Index('sport_slug_idx', ['slug'], {})
@Entity('sport', { schema: 'public' })
export class Sport {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('character varying', { name: 'name', nullable: true, length: 50 })
  name: string | null;

  @Column('text', { name: 'slug', nullable: true })
  slug: string | null;

  @OneToMany(() => League, (league) => league.sportType)
  leagues: League[];

  @OneToMany(() => Match, (match) => match.sport)
  matches: Match[];

  @OneToMany(() => Odd, (odd) => odd.sportType)
  odds: Odd[];

  @OneToMany(() => Player, (player) => player.sportType)
  players: Player[];

  @OneToMany(() => Team, (team) => team.sportType)
  teams: Team[];
}
