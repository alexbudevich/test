import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { League } from '../../leagues/entities/league.entity';
import { Player } from '../../players/entities/player.entity';
import { Venue } from '../../venues/entities/venue.entity';
import { Team } from '../../teams/entities/team.entity';
import { Odd } from '../../odds/entities/odd.entity';
import { Round } from '../../rounds/entities/round.entity';
import { FootballStatistic } from '../../../../common/entities/footbol-statistic.entity';
import { SportType } from '../../../../common/entities/sport-type.entity';

@Index('match_slug_idx', ['slug'], {})
@Entity('match', { schema: 'public' })
export class Match {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('timestamp with time zone', { name: 'date', nullable: true })
  date: Date | null;

  @Column('character varying', { name: 'weather', nullable: true, length: 50 })
  weather: string | null;

  @Column('text', { name: 'referee', nullable: true })
  referee: string | null;

  @Column('smallint', { name: 'match_score_home', nullable: true })
  matchScoreHome: number | null;

  @Column('smallint', { name: 'match_score_away', nullable: true })
  matchScoreAway: number | null;

  @Column('smallint', { name: 'elapsed', nullable: true })
  elapsed: number | null;

  @Column('character varying', {
    name: 'status_short',
    nullable: true,
    length: 5,
  })
  statusShort: string | null;

  @Column('json', { name: 'statistics', nullable: true })
  statistics: object | null;

  @Column('boolean', { name: 'is_live', nullable: true })
  isLive: boolean | null;

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

  @OneToMany(
    () => FootballStatistic,
    (footballStatistic) => footballStatistic.match,
  )
  footballStatistics: FootballStatistic[];

  @ManyToOne(() => League, (league) => league.matches)
  @JoinColumn([{ name: 'league_id', referencedColumnName: 'id' }])
  league: League;

  @ManyToOne(() => Round, (round) => round.matches)
  @JoinColumn([{ name: 'round_id', referencedColumnName: 'id' }])
  round: Round;

  @ManyToOne(() => SportType)
  @JoinColumn([{ name: 'sport_type_id', referencedColumnName: 'id' }])
  sportType: SportType;

  @ManyToOne(() => Team, (team) => team.awayMatches)
  @JoinColumn([
    {
      name: 'team_away_id',
      referencedColumnName: 'id',
      foreignKeyConstraintName: 'FK_team_away',
    },
  ])
  teamAway: Team;

  @ManyToOne(() => Team, (team) => team.homeMatches)
  @JoinColumn([
    {
      name: 'team_home_id',
      referencedColumnName: 'id',
      foreignKeyConstraintName: 'FK_team_home',
    },
  ])
  teamHome: Team;

  @ManyToOne(() => Venue, (venue) => venue.matches)
  @JoinColumn([{ name: 'venue_id', referencedColumnName: 'id' }])
  venue: Venue;

  @OneToMany(() => Odd, (odd) => odd.match)
  odds: Odd[];
}
