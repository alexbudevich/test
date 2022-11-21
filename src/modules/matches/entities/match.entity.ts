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
import { FootballStatistic } from '../../../common/entities/footbol-statistic.entity';

@Index('match_pkey', ['id'], { unique: true })
@Entity('match', { schema: 'public' })
export class Match {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('timestamp with time zone', { name: 'date', nullable: true })
  date: Date | null;

  @Column('character varying', { name: 'weather', nullable: true, length: 50 })
  weather: string | null;

  @Column('character varying', { name: 'referee', nullable: true, length: 50 })
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

  @OneToMany(
    () => FootballStatistic,
    (footballStatistic) => footballStatistic.match,
  )
  footballStatistics: FootballStatistic[];

  @ManyToOne(() => League, (league) => league.matches)
  @JoinColumn([{ name: 'league_id', referencedColumnName: 'id' }])
  league: League;

  @ManyToOne(() => Player, (player) => player.matches)
  @JoinColumn([{ name: 'player_1_id', referencedColumnName: 'id' }])
  player_1: Player;

  @ManyToOne(() => Player, (player) => player.matches2)
  @JoinColumn([{ name: 'player_2_id', referencedColumnName: 'id' }])
  player_2: Player;

  @ManyToOne(() => Round, (round) => round.matches)
  @JoinColumn([{ name: 'round_id', referencedColumnName: 'id' }])
  round: Round;

  @ManyToOne(() => Team, (team) => team.matches)
  @JoinColumn([{ name: 'team_away_id', referencedColumnName: 'id' }])
  teamAway: Team;

  @ManyToOne(() => Team, (team) => team.matches2)
  @JoinColumn([{ name: 'team_home_id', referencedColumnName: 'id' }])
  teamHome: Team;

  @ManyToOne(() => Venue, (venue) => venue.matches)
  @JoinColumn([{ name: 'venue_id', referencedColumnName: 'id' }])
  venue: Venue;

  @OneToMany(() => Odd, (odd) => odd.match)
  odds: Odd[];
}
