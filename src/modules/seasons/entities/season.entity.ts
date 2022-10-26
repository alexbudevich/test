import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { League } from '../../leagues/entities/league.entity';

@Index('season_pkey', ['id'], { unique: true })
@Entity('season', { schema: 'public' })
export class Season {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('smallint', { name: 'year' })
  year: number;

  @OneToMany(() => League, (league) => league.season)
  leagues: League[];
}
