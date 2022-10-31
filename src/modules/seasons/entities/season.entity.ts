import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { League } from '../../leagues/entities/league.entity';
import { Week } from '../../../common/entitys/week.entity';

@Index('season_pkey', ['id'], { unique: true })
@Entity('season', { schema: 'public' })
export class Season {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('smallint', { name: 'year_from', nullable: true })
  yearFrom: number | null;

  @Column('smallint', { name: 'year_to', nullable: true })
  yearTo: number | null;

  @OneToMany(() => League, (league) => league.season)
  leagues: League[];

  @OneToMany(() => Week, (week) => week.season)
  weeks: Week[];
}
