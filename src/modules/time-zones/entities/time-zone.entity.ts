import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Index('time_zone_pkey', ['id'], { unique: true })
@Entity('time_zone', { schema: 'public' })
export class TimeZone {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('character varying', { name: 'time_zone', length: 10 })
  timeZone: string;

  @Column('time with time zone', { name: 'offset' })
  offset: string;
}
