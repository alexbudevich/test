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
import { League } from '../../leagues/entities/league.entity';
import { Venue } from '../../venues/entities/venue.entity';
import { Country } from '../../countries/entities/country.entity';
import { Match } from '../../matches/entities/match.entity';
import { Player } from '../../players/entities/player.entity';

@Index('team_pkey', ['id'], { unique: true })
@Entity('team', { schema: 'public' })
export class Team {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('character varying', { name: 'name', nullable: true, length: 50 })
  name: string | null;

  @Column('character varying', { name: 'code', nullable: true, length: 50 })
  code: string | null;

  @Column('character varying', { name: 'founded', nullable: true, length: 50 })
  founded: string | null;

  @Column('character varying', { name: 'national', nullable: true, length: 50 })
  national: string | null;

  @Column('text', { name: 'logo_url', nullable: true })
  logoUrl: string | null;

  @Column('json', { name: 'statistics', nullable: true })
  statistics: object | null;

  @Column('character varying', {
    name: 'provider_id',
    nullable: true,
    length: 50,
  })
  providerId: string | null;

  @OneToMany(() => Match, (match) => match.teamAway)
  matches: Match[];

  @OneToMany(() => Match, (match) => match.teamHome)
  matches2: Match[];

  @OneToMany(() => Sport, (sport) => sport.team)
  sports: Sport[];

  @ManyToOne(() => Country, (country) => country.teams)
  @JoinColumn([{ name: 'country_id', referencedColumnName: 'id' }])
  country: Country;

  @ManyToOne(() => League, (league) => league.teams)
  @JoinColumn([{ name: 'league_id', referencedColumnName: 'id' }])
  league: League;

  @ManyToOne(() => Venue, (venue) => venue.teams)
  @JoinColumn([{ name: 'venue_id', referencedColumnName: 'id' }])
  venue: Venue;

  @OneToMany(() => Player, (player) => player.team)
  players: Player[];
}
