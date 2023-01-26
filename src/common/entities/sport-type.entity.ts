import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Index('sport_type_slug_idx', ['slug'], {})
@Entity('sport_type', { schema: 'public' })
export class SportType {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('character varying', { name: 'name', nullable: true, length: 50 })
  name: string | null;

  @Column('text', { name: 'slug', nullable: true })
  slug: string | null;
}
