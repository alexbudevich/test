import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { League } from '../../leagues/entities/league.entity';
import { Country } from '../../countries/entities/country.entity';
import { Match } from '../../matches/entities/basketball-match.entity';
import { Player } from '../../players/entities/player.entity';
import { Sport } from '../../../common/entities/sport-type.entity';
import { TeamTopScore } from '../dto/team-top-score.dto';

@Index('team_pkey', ['id'], { unique: true })
@Index('team_slug_idx', ['slug'], {})
@Entity('team', { schema: 'public' })
export class Team {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('character varying', { name: 'name', nullable: true, length: 50 })
  name: string | null;

  @Column('character varying', { name: 'code', nullable: true, length: 50 })
  code: string | null;

  @Column('text', { name: 'logo_url', nullable: true })
  logoUrl: string | null;

  @Column('character varying', {
    name: 'provider_id',
    nullable: true,
    length: 50,
  })
  providerId: string | null;

  @Column('smallint', { name: 'founded', nullable: true })
  founded: number | null;

  @Column('boolean', { name: 'national', nullable: true })
  national: boolean | null;

  @Column('timestamp with time zone', {
    name: 'timestamp',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  timestamp: Date | null;

  @Column('text', { name: 'slug', nullable: true })
  slug: string | null;

  @Column('text', { name: 's3_logo_url', nullable: true })
  s3LogoUrl: string | null;
  teamTopScore: TeamTopScore[];

  @OneToMany(() => Match, (match) => match.teamAway)
  awayMatches: Match[];

  @OneToMany(() => Match, (match) => match.teamHome)
  homeMatches: Match[];

  @ManyToOne(() => Country, (country) => country.teams)
  @JoinColumn([{ name: 'country_id', referencedColumnName: 'id' }])
  country: Country;

  @ManyToOne(() => League, (league) => league.teams)
  @JoinColumn([{ name: 'league_id', referencedColumnName: 'id' }])
  league: League;

  @ManyToOne(() => Sport, (sportType) => sportType.teams)
  @JoinColumn([{ name: 'sport_type_id', referencedColumnName: 'id' }])
  sportType: Sport;

  @ManyToMany(() => Player, (player) => player.team)
  players: Player[];
}
