import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Bookmaker } from '../../bookmakers/entities/bookmaker.entity';
import {League} from "../../football/leagues/entities/league.entity";

@Index('country_slug_idx', ['slug'], {})
@Entity('country', { schema: 'public' })
export class CountryFootballEntity {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('character varying', { name: 'name', nullable: true, length: 50 })
  name: string | null;

  @Column('character varying', { name: 'code', nullable: true, length: 50 })
  code: string | null;

  @Column('text', { name: 'flag_url', nullable: true })
  flagUrl: string | null;

  @Column('text', { name: 'slug', nullable: true })
  slug: string | null;

  @Column('text', { name: 's3_flag_url', nullable: true })
  s3FlagUrl: string | null;

  @OneToMany(() => Bookmaker, (bookmaker) => bookmaker.country)
  bookmakers: Bookmaker[];

  @OneToMany(() => League, (league) => league.country)
  leagues: League[];
}
