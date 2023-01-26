import {
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Country } from '../../../countries/entities/country.entity';
import { Match } from '../../matches/entities/match.entity';
import { Team } from '../../teams/entities/team.entity';
import { FootballStatistic } from '../../../../common/entities/footbol-statistic.entity';
import { SportType } from '../../../../common/entities/sport-type.entity';

@Index('player_slug_idx', ['slug'], {})
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

  @Column('character varying', { name: 'place', nullable: true, length: 50 })
  place: string | null;

  @Column('character varying', {
    name: 'nationality',
    nullable: true,
    length: 50,
  })
  nationality: string | null;

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

  @Column('character varying', {
    name: 'provider_id',
    nullable: true,
    length: 50,
  })
  providerId: string | null;

  @Column('text', { name: 'height', nullable: true })
  height: string | null;

  @Column('text', { name: 'weight', nullable: true })
  weight: string | null;

  @Column('timestamp with time zone', {
    name: 'timestamp',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  timestamp: Date | null;

  @Column('text', { name: 'slug', nullable: true })
  slug: string | null;

  @Column('text', { name: 's3_photo_url', nullable: true })
  s3PhotoUrl: string | null;

  @OneToMany(
    () => FootballStatistic,
    (footballStatistic) => footballStatistic.player,
  )
  footballStatistics: FootballStatistic[];

  @ManyToOne(() => Country)
  @JoinColumn([{ name: 'country_id', referencedColumnName: 'id' }])
  country: Country;

  @ManyToOne(() => SportType)
  @JoinColumn([{ name: 'sport_type_id', referencedColumnName: 'id' }])
  sportType: SportType;

  @ManyToMany(() => Team, (team) => team.players)
  @JoinTable({
    name: 'new_team_player',
    joinColumn: {
      name: 'player_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'team_id',
      referencedColumnName: 'id',
    },
  })
  team: Team[];
}
