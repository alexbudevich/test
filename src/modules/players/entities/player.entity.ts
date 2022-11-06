import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Sport } from '../../sports/entities/sport.entity';
import { Country } from '../../countries/entities/country.entity';
import { Match } from '../../matches/entities/match.entity';
import { TeamPlayer } from './team-player.entity';

@Index('player_pkey', ['id'], { unique: true })
@Entity('player', { schema: 'public' })
export class Player {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('character varying', { name: 'name', nullable: true, length: 50 })
  name: string | null;

  @Column('character varying', {
    name: 'firstname',
    nullable: true,
    length: 50,
  })
  firstname: string | null;

  @Column('character varying', { name: 'lastname', nullable: true, length: 50 })
  lastname: string | null;

  @Column('smallint', { name: 'age', nullable: true })
  age: number | null;

  @Column('date', { name: 'birth', nullable: true })
  birth: string | null;

  @Column('date', { name: 'date', nullable: true })
  date: string | null;

  @Column('character varying', { name: 'place', nullable: true, length: 50 })
  place: string | null;

  @Column('character varying', {
    name: 'nationality',
    nullable: true,
    length: 50,
  })
  nationality: string | null;

  @Column('smallint', { name: 'height', nullable: true })
  height: number | null;

  @Column('smallint', { name: 'weight', nullable: true })
  weight: number | null;

  @Column('boolean', { name: 'is_injured', nullable: true })
  isInjured: boolean | null;

  @Column('text', { name: 'photo_url', nullable: true })
  photoUrl: string | null;

  @Column('json', { name: 'statistics', nullable: true })
  statistics: object | null;

  @Column('boolean', { name: 'is_coach', nullable: true })
  isCoach: boolean | null;

  @Column('json', { name: 'career', nullable: true })
  career: object | null;

  @OneToMany(() => Match, (match) => match.player_1)
  matches: Match[];

  @OneToMany(() => Match, (match) => match.player_2)
  matches2: Match[];

  @ManyToOne(() => Country, (country) => country.players)
  @JoinColumn([{ name: 'country_id', referencedColumnName: 'id' }])
  country: Country;

  @OneToMany(() => Sport, (sport) => sport.player)
  sports: Sport[];

  @OneToMany(() => TeamPlayer, (teamPlayer) => teamPlayer.player)
  teamPlayers: TeamPlayer[];
}
