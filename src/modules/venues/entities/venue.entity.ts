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

  @Column('character varying', { name: 'name', length: 50 })
  name: string;

  @Column('text', { name: 'address' })
  address: string;

  @Column('character varying', { name: 'city', length: 50 })
  city: string;

  @Column('character varying', { name: 'capacity', length: 50 })
  capacity: string;

  @Column('character varying', { name: 'surface', length: 50 })
  surface: string;

  @Column('text', { name: 'image_url' })
  imageUrl: string;

  @OneToMany(() => Match, (match) => match.venue)
  matches: Match[];

  @OneToMany(() => Team, (team) => team.venue)
  teams: Team[];

  @ManyToOne(() => Country, (country) => country.venues)
  @JoinColumn([{ name: 'country_id', referencedColumnName: 'id' }])
  country: Country;
}
