import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Sport } from '../../modules/sports/entities/sport.entity';

@Index('sport_type_pkey', ['id'], { unique: true })
@Entity('sport_type', { schema: 'public' })
export class SportType {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('character varying', { name: 'name', nullable: true, length: 50 })
  name: string | null;

  @OneToMany(() => Sport, (sport) => sport.type)
  sports: Sport[];
}
