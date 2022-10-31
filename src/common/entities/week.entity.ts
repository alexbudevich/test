import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { League } from '../../modules/leagues/entities/league.entity';
import { Season } from '../../modules/seasons/entities/season.entity';

@Index('week_pkey', ['id'], { unique: true })
@Entity('week', { schema: 'public' })
export class Week {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('timestamp with time zone', { name: 'timestamp', nullable: true })
  timestamp: Date | null;

  @Column('boolean', { name: 'is_current', nullable: true })
  isCurrent: boolean | null;

  @ManyToOne(() => League, (league) => league.weeks)
  @JoinColumn([{ name: 'league_id', referencedColumnName: 'id' }])
  league: League;

  @ManyToOne(() => Season, (season) => season.weeks)
  @JoinColumn([{ name: 'season_id', referencedColumnName: 'id' }])
  season: Season;
}
