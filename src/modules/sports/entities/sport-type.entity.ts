import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { League } from '../../leagues/entities/league.entity';
import { Match } from '../../matches/entities/match.entity';
import { Odd } from '../../odds/entities/odd.entity';
import { Player } from '../../players/entities/player.entity';
import { Team } from '../../teams/entities/team.entity';

@Index('sport_type_pkey', ['id'], { unique: true })
@Index('sport_type_slug_idx', ['slug'], {})
@Entity('sport_type', { schema: 'public' })
export class SportType {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('character varying', { name: 'name', nullable: true, length: 50 })
  name: string | null;

  @Column('text', { name: 'slug', nullable: true })
  slug: string | null;

  @OneToMany(() => League, (league) => league.sportType)
  leagues: League[];

  @OneToMany(() => Match, (match) => match.sportType)
  matches: Match[];

  @OneToMany(() => Odd, (odd) => odd.sportType)
  odds: Odd[];

  @OneToMany(() => Player, (player) => player.sportType)
  players: Player[];

  @OneToMany(() => Team, (team) => team.sportType)
  teams: Team[];
}
