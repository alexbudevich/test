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

  @Column('json', { name: 'odds', nullable: true })
  odds: object | null;

  @ManyToOne(() => Bookmaker, (bookmaker) => bookmaker.odds)
  @JoinColumn([{ name: 'bookmaker_id', referencedColumnName: 'id' }])
  bookmaker: Bookmaker;

  @ManyToOne(() => Match, (match) => match.odds)
  @JoinColumn([{ name: 'match_id', referencedColumnName: 'id' }])
  match: Match;
}
