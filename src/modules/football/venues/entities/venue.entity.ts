import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Country } from '../../../countries/entities/country.entity';
import { Team } from '../../teams/entities/team.entity';
import { Match } from '../../matches/entities/match.entity';

@Index('venue_pkey', ['id'], { unique: true })
@Index('venue_slug_idx', ['slug'], {})
@Entity('venue', { schema: 'public' })
export class Venue {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('text', { name: 'name', nullable: true })
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

  @Column('character varying', {
    name: 'provider_id',
    nullable: true,
    length: 50,
  })
  providerId: string | null;

  @Column('timestamp with time zone', {
    name: 'timestamp',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  timestamp: Date | null;

  @Column('text', { name: 'slug', nullable: true })
  slug: string | null;

  @Column('text', { name: 's3_image_url', nullable: true })
  s3ImageUrl: string | null;

  @OneToMany(() => Match, (match) => match.venue)
  matches: Match[];

  @OneToMany(() => Team, (team) => team.venue)
  teams: Team[];

  @JoinColumn([{ name: 'country_id', referencedColumnName: 'id' }])
  country: Country;
}
