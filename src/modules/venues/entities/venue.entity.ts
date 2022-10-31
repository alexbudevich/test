import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Country } from '../../countries/entities/country.entity';
import { Team } from '../../teams/entities/team.entity';
import { Match } from '../../matches/entities/match.entity';

@Index('venue_pkey', ['id'], { unique: true })
@Entity('venue', { schema: 'public' })
export class Venue {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('character varying', { name: 'name', nullable: true, length: 50 })
  name: string | null;

  @Column('text', { name: 'address', nullable: true })
  address: string | null;

  @Column('character varying', { name: 'city', nullable: true, length: 50 })
  city: string | null;

  @Column('character varying', { name: 'surface', nullable: true, length: 50 })
  surface: string | null;

  @Column('text', { name: 'image_url', nullable: true })
  imageUrl: string | null;

  @Column('smallint', { name: 'capacity', nullable: true })
  capacity: number | null;

  @Column('smallint', { name: 'rank', nullable: true })
  rank: number | null;

  @Column('smallint', { name: 'played', nullable: true })
  played: number | null;

  @Column('smallint', { name: 'win', nullable: true })
  win: number | null;

  @Column('smallint', { name: 'draw', nullable: true })
  draw: number | null;

  @Column('smallint', { name: 'lose', nullable: true })
  lose: number | null;

  @Column('timestamp with time zone', { name: 'timestamp', nullable: true })
  timestamp: Date | null;

  @OneToMany(() => Match, (match) => match.venue)
  matches: Match[];

  @OneToMany(() => Team, (team) => team.venue)
  teams: Team[];

  @ManyToOne(() => Country, (country) => country.venues)
  @JoinColumn([{ name: 'country_id', referencedColumnName: 'id' }])
  country: Country;
}
