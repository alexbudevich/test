import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Sport } from '../../sports/entities/sport.entity';
import { Country } from '../../countries/entities/country.entity';
import { Round } from '../../rounds/entities/round.entity';
import { Team } from '../../teams/entities/team.entity';
import { Season } from '../../seasons/entities/season.entity';
import { Match } from '../../matches/entities/match.entity';
import { Week } from '../../../common/entitys/week.entity';

@Index('league_pkey', ['id'], { unique: true })
@Entity('league', { schema: 'public' })
export class League {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('character varying', { name: 'name', nullable: true, length: 50 })
  name: string | null;

  @Column('character varying', { name: 'type', nullable: true, length: 50 })
  type: string | null;

  @Column('text', { name: 'logo_url', nullable: true })
  logoUrl: string | null;

  @ManyToOne(() => Country, (country) => country.leagues)
  @JoinColumn([{ name: 'country_id', referencedColumnName: 'id' }])
  country: Country;

  @ManyToOne(() => Season, (season) => season.leagues)
  @JoinColumn([{ name: 'season_id', referencedColumnName: 'id' }])
  season: Season;

  @OneToMany(() => Match, (match) => match.league)
  matches: Match[];

  @OneToMany(() => Round, (round) => round.league)
  rounds: Round[];

  @OneToMany(() => Sport, (sport) => sport.league)
  sports: Sport[];

  @OneToMany(() => Team, (team) => team.league)
  teams: Team[];

  @OneToMany(() => Week, (week) => week.league)
  weeks: Week[];
}
