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
import { Match } from '../../matches/entities/match.entity';

@Index('round_pkey', ['id'], { unique: true })
@Index('round_slug_idx', ['slug'], {})
@Entity('round', { schema: 'public' })
export class Round {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('character varying', { name: 'name', nullable: true, length: 50 })
  name: string | null;

  @Column('text', { name: 'slug', nullable: true })
  slug: string | null;

  @OneToMany(() => Match, (match) => match.round)
  matches: Match[];

  @ManyToOne(() => League, (league) => league.rounds)
  @JoinColumn([{ name: 'league_id', referencedColumnName: 'id' }])
  league: League;
}
