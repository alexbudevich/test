import {
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BasketballMatch } from '../../matches/entities/basketball-match.entity';
import { SportType } from '../../../../common/entities/sport-type.entity';
import { Week } from '../../../../common/entities/week.entity';
import { Country } from '../../../countries/entities/country.entity';
import { Season } from '../../../seasons/entities/season.entity';
import { BasketballTeam } from '../../teams/entities/basketball-team.entity';

@Index('basketball_league_slug_idx', ['slug'], {})
@Entity('basketball_league', { schema: 'public' })
export class BasketballLeague {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('text', { name: 'name', nullable: true })
  name: string | null;

  @Column('character varying', { name: 'type', nullable: true, length: 50 })
  type: string | null;

  @Column('text', { name: 'logo_url', nullable: true })
  logoUrl: string | null;

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

  @Column('json', { name: 'standings', nullable: true })
  standings: object | null;

  @Column('text', { name: 'slug', nullable: true })
  slug: string | null;

  @Column('text', { name: 's3_logo_url', nullable: true })
  s3LogoUrl: string | null;

  @Column('text', { name: 'description', nullable: true })
  description: string | null;

  @Column('text', { name: 'metadata', nullable: true })
  metadata: string | null;

  @Column('timestamp with time zone', { name: 'season_start', nullable: true })
  seasonStart: Date | null;

  @Column('timestamp with time zone', { name: 'season_end', nullable: true })
  seasonEnd: Date | null;

  @ManyToOne(() => Country)
  @JoinColumn([{ name: 'country_id', referencedColumnName: 'id' }])
  country: Country;

  @ManyToOne(() => SportType)
  @JoinColumn([{ name: 'sport_type_id', referencedColumnName: 'id' }])
  sportType: SportType;

  @ManyToMany(() => Season)
  @JoinTable({
    name: 'basketball_league_season',
    joinColumn: {
      name: 'league_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'season_id',
      referencedColumnName: 'id',
    },
  })
  seasons: Season[];

  @OneToMany(() => BasketballMatch, (match) => match.league)
  matches: BasketballMatch[];

  @OneToMany(() => BasketballTeam, (team) => team.league)
  teams: BasketballTeam[];

  @OneToMany(() => Week, (week) => week.league)
  weeks: Week[];
}
