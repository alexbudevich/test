import {
  Column,
  Entity,
  Index,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Week } from '../../../common/entities/week.entity';
import { League } from '../../football/leagues/entities/league.entity';

@Index('season_pkey', ['id'], { unique: true })
@Index('season_slug_idx', ['slug'], {})
@Entity('season', { schema: 'public' })
export class Season {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('smallint', { name: 'year', nullable: true })
  year: number | null;

  @Column('character varying', { name: 'start', nullable: true, length: 50 })
  start: string | null;

  @Column('character varying', { name: 'end', nullable: true, length: 50 })
  end: string | null;

  @Column('timestamp with time zone', {
    name: 'timestamp',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  timestamp: Date | null;

  @Column('text', { name: 'slug', nullable: true })
  slug: string | null;

  @ManyToMany(() => League, (league) => league.seasons)
  league: League[];

  @OneToMany(() => Week, (week) => week.season)
  weeks: Week[];
}
