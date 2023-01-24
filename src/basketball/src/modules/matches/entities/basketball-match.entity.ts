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
import { League } from '../../leagues/entities/league.entity';
import { Team } from '../../teams/entities/team.entity';
import { Odd } from '../../odds/entities/odd.entity';
import { Sport } from '../../../common/entities/sport-type.entity';

@Index('match_pkey', ['id'], { unique: true })
@Index('match_slug_idx', ['slug'], {})
@Entity('match', { schema: 'public' })
export class Match {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('timestamp with time zone', { name: 'date', nullable: true })
  date: Date | null;

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

  @ManyToOne(() => League, (league) => league.matches)
  @JoinColumn([{ name: 'league_id', referencedColumnName: 'id' }])
  league: League;

  @ManyToOne(() => Sport, (sportType) => sportType.matches)
  @JoinColumn([{ name: 'sport_type_id', referencedColumnName: 'id' }])
  sport: Sport;

  @ManyToOne(() => Team, (team) => team.awayMatches)
  @JoinColumn([{ name: 'team_away_id', referencedColumnName: 'id' }])
  teamAway: Team;

  @ManyToOne(() => Team, (team) => team.homeMatches)
  @JoinColumn([{ name: 'team_home_id', referencedColumnName: 'id' }])
  teamHome: Team;

  @OneToMany(() => Odd, (odd) => odd.match)
  odds: Odd[];

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
