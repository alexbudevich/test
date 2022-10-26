import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { League } from '../../leagues/entities/league.entity';

@Index('round_pkey', ['id'], { unique: true })
@Entity('round', { schema: 'public' })
export class Round {
  @Column('integer', { primary: true, name: 'id' })
  id: number;

  @Column('character varying', { name: 'name', nullable: true, length: 50 })
  name: string | null;

  @ManyToOne(() => League, (league) => league.rounds)
  @JoinColumn([{ name: 'league_id', referencedColumnName: 'id' }])
  league: League;
}
