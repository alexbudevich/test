import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Bookmaker } from '../../bookmakers/entities/bookmaker.entity';
import { Match } from '../../matches/entities/match.entity';

@Index('odd_pkey', ['id'], { unique: true })
@Entity('odd', { schema: 'public' })
export class Odd {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('character varying', { name: 'name', nullable: true, length: 50 })
  name: string | null;

  @Column('character varying', { name: 'value', nullable: true, length: 50 })
  value: string | null;

  @Column('integer', { name: 'handicap', nullable: true })
  handicap: number | null;

  @Column('boolean', { name: 'is_main', nullable: true })
  isMain: boolean | null;

  @Column('boolean', { name: 'is_suspended', nullable: true })
  isSuspended: boolean | null;

  @Column('numeric', { name: 'odd', nullable: true })
  odd: string | null;

  @Column('character varying', {
    name: 'provider_id',
    nullable: true,
    length: 50,
  })
  providerId: string | null;

  @ManyToOne(() => Bookmaker, (bookmaker) => bookmaker.odds)
  @JoinColumn([{ name: 'bookmaker_id', referencedColumnName: 'id' }])
  bookmaker: Bookmaker;

  @ManyToOne(() => Match, (match) => match.odds)
  @JoinColumn([{ name: 'match_id', referencedColumnName: 'id' }])
  match: Match;
}
