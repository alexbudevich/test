import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { League } from '../../leagues/entities/league.entity';
import { Player } from '../../players/entities/player.entity';
import { Sport } from '../../sports/entities/sport.entity';
import { Bookmaker } from '../../bookmakers/entities/bookmaker.entity';
import { Venue } from '../../venues/entities/venue.entity';
import { Team } from '../../teams/entities/team.entity';
import { Match } from '../../matches/entities/match.entity';

@Index('country_pkey', ['id'], { unique: true })
@Entity('country', { schema: 'public' })
export class Country {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('character varying', { name: 'name', nullable: true, length: 50 })
  name: string | null;

  @Column('character varying', { name: 'code', nullable: true, length: 50 })
  code: string | null;

  @Column('text', { name: 'flag_url', nullable: true })
  flagUrl: string | null;

  @OneToMany(() => Bookmaker, (bookmaker) => bookmaker.country)
  bookmakers: Bookmaker[];

  @OneToMany(() => League, (league) => league.country)
  leagues: League[];

  @OneToMany(() => Match, (match) => match.country)
  matches: Match[];

  @OneToMany(() => Player, (player) => player.country)
  players: Player[];

  @OneToMany(() => Sport, (sport) => sport.country)
  sports: Sport[];

  @OneToMany(() => Team, (team) => team.country)
  teams: Team[];

  @OneToMany(() => Venue, (venue) => venue.country)
  venues: Venue[];
}
