import { League } from '../../leagues/entities/league.entity';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Player } from '../../players/entities/player.entity';
import { Country } from '../../countries/entities/country.entity';
import { Team } from '../../teams/entities/team.entity';

@Index('sport_pkey', ['id'], { unique: true })
@Entity('sport', { schema: 'public' })
export class Sport {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('character varying', { name: 'place', nullable: true, length: 50 })
  place: string | null;

  @Column('timestamp with time zone', { name: 'datetime', nullable: true })
  datetime: Date | null;

  @Column('boolean', { name: 'is_live', nullable: true })
  isLive: boolean | null;

  @Column('character varying', { name: 'referee', nullable: true, length: 50 })
  referee: string | null;

  @Column('json', { name: 'lineups', nullable: true })
  lineups: object | null;

  @Column('json', { name: 'statistics', nullable: true })
  statistics: object | null;

  @Column('json', { name: 'odds_movement', nullable: true })
  oddsMovement: object | null;

  @Column('json', { name: 'odds_movement_timeline', nullable: true })
  oddsMovementTimeline: object | null;

  @Column('json', { name: 'odds_outright', nullable: true })
  oddsOutright: object | null;

  @Column('json', { name: 'betting_offers_special_offer', nullable: true })
  bettingOffersSpecialOffer: object | null;

  @Column('json', { name: 'betting_offers_bonuses', nullable: true })
  bettingOffersBonuses: object | null;

  @ManyToOne(() => Country, (country) => country.sports)
  @JoinColumn([{ name: 'country_id', referencedColumnName: 'id' }])
  country: Country;

  @ManyToOne(() => League, (league) => league.sports)
  @JoinColumn([{ name: 'league_id', referencedColumnName: 'id' }])
  league: League;

  @ManyToOne(() => Player, (player) => player.sports)
  @JoinColumn([{ name: 'player_id', referencedColumnName: 'id' }])
  player: Player;

  @ManyToOne(() => Team, (team) => team.sports)
  @JoinColumn([{ name: 'team_id', referencedColumnName: 'id' }])
  team: Team;
}
