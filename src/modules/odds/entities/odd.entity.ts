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
import { SportType } from '../../../common/entities/sport-type.entity';

@Index('odd_bookmaker_id_idx', ['bookmakerId'], {})
@Index('odd_match_id_bookmaker_id_idx', ['bookmakerId', 'matchId'], {})
@Index('odd_pkey', ['id'], { unique: true })
@Index('odd_match_id_idx', ['matchId'], {})
@Entity('odd', { schema: 'public' })
export class Odd {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('integer', { name: 'match_id', nullable: true })
  matchId: number | null;

  @Column('integer', { name: 'bookmaker_id', nullable: true })
  bookmakerId: number | null;

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

  @Column('timestamp with time zone', {
    name: 'timestamp',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  timestamp: Date | null;

  @ManyToOne(() => Bookmaker, (bookmaker) => bookmaker.odds)
  @JoinColumn([{ name: 'bookmaker_id', referencedColumnName: 'id' }])
  bookmaker: Bookmaker;

  @ManyToOne(() => Match, (match) => match.odds)
  @JoinColumn([{ name: 'match_id', referencedColumnName: 'id' }])
  match: Match;

  @ManyToOne(() => SportType, (sportType) => sportType.odds)
  @JoinColumn([{ name: 'sport_type_id', referencedColumnName: 'id' }])
  sportType: SportType;
}
