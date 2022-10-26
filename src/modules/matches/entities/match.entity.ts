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
import { Country } from '../../countries/entities/country.entity';
import { Team } from '../../teams/entities/team.entity';
import { Odd } from '../../odds/entities/odd.entity';

@Index('match_pkey', ['id'], { unique: true })
@Entity('match', { schema: 'public' })
export class Match {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('timestamp with time zone', { name: 'date' })
  date: Date;

  @Column('character varying', { name: 'weather', length: 50 })
  weather: string;

  @Column('character varying', { name: 'referee', length: 50 })
  referee: string;

  @Column('smallint', { name: 'match_score_team_home', nullable: true })
  matchScoreTeamHome: number | null;

  @Column('smallint', { name: 'match_score_team_away', nullable: true })
  matchScoreTeamAway: number | null;

  @ManyToOne(() => Country, (country) => country.matches)
  @JoinColumn([{ name: 'country_id', referencedColumnName: 'id' }])
  country: Country;

  @ManyToOne(() => League, (league) => league.matches)
  @JoinColumn([{ name: 'league_id', referencedColumnName: 'id' }])
  league: League;

  @ManyToOne(() => Player, (player) => player.matches)
  @JoinColumn([{ name: 'player_1_id', referencedColumnName: 'id' }])
  player_1: Player;

  @ManyToOne(() => Player, (player) => player.matches2)
  @JoinColumn([{ name: 'player_2_id', referencedColumnName: 'id' }])
  player_2: Player;

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
