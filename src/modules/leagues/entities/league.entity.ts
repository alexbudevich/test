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
import { Country } from '../../countries/entities/country.entity';
import { Round } from '../../rounds/entities/round.entity';
import { Team } from '../../teams/entities/team.entity';
import { Season } from '../../seasons/entities/season.entity';
import { Match } from '../../matches/entities/match.entity';
import { Week } from '../../../common/entities/week.entity';
import { SportType } from '../../../common/entities/sport-type.entity';

@Index('league_pkey', ['id'], { unique: true })
@Entity('league', { schema: 'public' })
export class League {
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

  @ManyToOne(() => Country, (country) => country.leagues, { eager: true })
  @JoinColumn([{ name: 'country_id', referencedColumnName: 'id' }])
  country: Country;

  @ManyToOne(() => SportType, (sportType) => sportType.leagues)
  @JoinColumn([{ name: 'sport_type_id', referencedColumnName: 'id' }])
  sportType: SportType;

  @ManyToMany(() => Season)
  @JoinTable({
    name: 'league_season',
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

  @OneToMany(() => Match, (match) => match.league)
  matches: Match[];

  @OneToMany(() => Round, (round) => round.league)
  rounds: Round[];

  @OneToMany(() => Team, (team) => team.league)
  teams: Team[];

  @OneToMany(() => Week, (week) => week.league)
  weeks: Week[];
}
