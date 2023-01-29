import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BasketballLeague } from '../../leagues/entities/basketball-league.entity';
import { SportType } from '../../../../common/entities/sport-type.entity';
import { BasketballOdd } from '../../odds/entities/basketball-odd.entity';
import { BasketballTeam } from '../../teams/entities/basketball-team.entity';

@Index('basketball_match_slug_idx', ['slug'], {})
@Entity('basketball_match', { schema: 'public' })
export class BasketballMatch {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('timestamp with time zone', { name: 'date', nullable: true })
  date: Date | null;

  @Column('smallint', { name: 'match_score_home', nullable: true })
  matchScoreHome: number | null;

  @Column('smallint', { name: 'match_score_away', nullable: true })
  matchScoreAway: number | null;

  @Column('character varying', { name: 'elapsed', nullable: true })
  elapsed: string | null;

  @Column('character varying', {
    name: 'status_short',
    nullable: true,
    length: 5,
  })
  statusShort: string | null;

  @Column('character varying', {
    name: 'status_long',
    nullable: true,
  })
  statusLong: string | null;

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

  @Column('text', { name: 'slug', nullable: true })
  slug: string | null;

  @ManyToOne(() => BasketballLeague, (league) => league.matches)
  @JoinColumn([{ name: 'league_id', referencedColumnName: 'id' }])
  league: BasketballLeague;

  @ManyToOne(() => SportType)
  @JoinColumn([{ name: 'sport_type_id', referencedColumnName: 'id' }])
  sport: SportType;

  @ManyToOne(() => BasketballTeam, (team) => team.awayMatches)
  @JoinColumn([{ name: 'team_away_id', referencedColumnName: 'id' }])
  teamAway: BasketballTeam;

  @ManyToOne(() => BasketballTeam, (team) => team.homeMatches)
  @JoinColumn([{ name: 'team_home_id', referencedColumnName: 'id' }])
  teamHome: BasketballTeam;

  @OneToMany(() => BasketballOdd, (odd) => odd.match)
  odds: BasketballOdd[];

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public updated_at: Date;
}
