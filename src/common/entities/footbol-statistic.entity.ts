import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Match } from '../../modules/football/matches/entities/match.entity';
import { Player } from '../../modules/players/entities/player.entity';
import { Team } from '../../modules/teams/entities/team.entity';

@Index('statistic_pkey', ['id'], { unique: true })
@Index('football_statistic_player_id_idx', ['playerId'], {})
@Entity('football_statistic', { schema: 'public' })
export class FootballStatistic {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @PrimaryGeneratedColumn({ type: 'integer', name: 'player_id' })
  playerId: number;

  @Column('smallint', { name: 'games_number', nullable: true })
  gamesNumber: number | null;

  @Column('smallint', { name: 'games_minutes', nullable: true })
  gamesMinutes: number | null;

  @Column('character varying', {
    name: 'games_position',
    nullable: true,
    length: 50,
  })
  gamesPosition: string | null;

  @Column('numeric', { name: 'games_rating', nullable: true })
  gamesRating: string | null;

  @Column('boolean', { name: 'games_captain', nullable: true })
  gamesCaptain: boolean | null;

  @Column('smallint', { name: 'substitutes_in', nullable: true })
  substitutesIn: number | null;

  @Column('smallint', { name: 'substitutes_out', nullable: true })
  substitutesOut: number | null;

  @Column('smallint', { name: 'substitutes_bench', nullable: true })
  substitutesBench: number | null;

  @Column('smallint', { name: 'shots_total', nullable: true })
  shotsTotal: number | null;

  @Column('smallint', { name: 'shots_on', nullable: true })
  shotsOn: number | null;

  @Column('smallint', { name: 'goals_total', nullable: true })
  goalsTotal: number | null;

  @Column('smallint', { name: 'goals_conceded', nullable: true })
  goalsConceded: number | null;

  @Column('smallint', { name: 'goals_assists', nullable: true })
  goalsAssists: number | null;

  @Column('smallint', { name: 'goals_saves', nullable: true })
  goalsSaves: number | null;

  @Column('smallint', { name: 'passes_total', nullable: true })
  passesTotal: number | null;

  @Column('smallint', { name: 'passes_key', nullable: true })
  passesKey: number | null;

  @Column('numeric', { name: 'passes_accuracy', nullable: true })
  passesAccuracy: string | null;

  @Column('smallint', { name: 'tackles_total', nullable: true })
  tacklesTotal: number | null;

  @Column('smallint', { name: 'tackles_blocks', nullable: true })
  tacklesBlocks: number | null;

  @Column('smallint', { name: 'tackles_interceptions', nullable: true })
  tacklesInterceptions: number | null;

  @Column('smallint', { name: 'duels_total', nullable: true })
  duelsTotal: number | null;

  @Column('smallint', { name: 'duels_won', nullable: true })
  duelsWon: number | null;

  @Column('smallint', { name: 'dribbles_attempts', nullable: true })
  dribblesAttempts: number | null;

  @Column('smallint', { name: 'dribbles_success', nullable: true })
  dribblesSuccess: number | null;

  @Column('smallint', { name: 'dribbles_past', nullable: true })
  dribblesPast: number | null;

  @Column('smallint', { name: 'fouls_drawn', nullable: true })
  foulsDrawn: number | null;

  @Column('smallint', { name: 'fouls_committed', nullable: true })
  foulsCommitted: number | null;

  @Column('smallint', { name: 'cards_yellow', nullable: true })
  cardsYellow: number | null;

  @Column('smallint', { name: 'cards_red', nullable: true })
  cardsRed: number | null;

  @Column('smallint', { name: 'penalty_won', nullable: true })
  penaltyWon: number | null;

  @Column('smallint', { name: 'penalty_commited', nullable: true })
  penaltyCommited: number | null;

  @Column('smallint', { name: 'penalty_scored', nullable: true })
  penaltyScored: number | null;

  @Column('smallint', { name: 'penalty_missed', nullable: true })
  penaltyMissed: number | null;

  @Column('smallint', { name: 'penalty_saved', nullable: true })
  penaltySaved: number | null;

  @Column('timestamp with time zone', {
    name: 'timestamp',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  timestamp: Date | null;

  @ManyToOne(() => Match, (match) => match.footballStatistics)
  @JoinColumn([{ name: 'match_id', referencedColumnName: 'id' }])
  match: Match;

  @ManyToOne(() => Player, (player) => player.footballStatistics)
  @JoinColumn([{ name: 'player_id', referencedColumnName: 'id' }])
  player: Player;

  @ManyToOne(() => Team, (team) => team.footballStatistics)
  @JoinColumn([{ name: 'team_id', referencedColumnName: 'id' }])
  team: Team;
}
