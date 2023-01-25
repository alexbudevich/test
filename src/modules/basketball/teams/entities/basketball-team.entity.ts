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
import { Player } from '../../../football/players/entities/player.entity';
import { FootballStatistic } from '../../../../common/entities/footbol-statistic.entity';
import { SportType } from '../../../../common/entities/sport-type.entity';
import { TeamTopScore } from '../dto/team-top-score.dto';
import { Exclude } from 'class-transformer';
import { BasketballMatch } from '../../matches/entities/basketball-match.entity';
import { Country } from '../../../countries/entities/country.entity';
import { BasketballLeague } from '../../leagues/entities/basketball-league.entity';

@Index('basketball_team_pkey', ['id'], { unique: true })
@Index('basketball_team_slug_idx', ['slug'], {})
@Entity('basketball_team', { schema: 'public' })
export class BasketballTeam {
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

  @OneToMany(() => BasketballMatch, (match) => match.teamAway)
  awayMatches: BasketballMatch[];

  @OneToMany(() => BasketballMatch, (match) => match.teamHome)
  homeMatches: BasketballMatch[];

  @JoinColumn([{ name: 'country_id', referencedColumnName: 'id' }])
  country: Country;

  @ManyToOne(() => BasketballLeague, (league) => league.teams)
  @JoinColumn([{ name: 'league_id', referencedColumnName: 'id' }])
  league: BasketballLeague;

  @JoinColumn([{ name: 'sport_type_id', referencedColumnName: 'id' }])
  sportType: SportType;

  @ManyToMany(() => Player, (player) => player.team)
  players: Player[];
}
