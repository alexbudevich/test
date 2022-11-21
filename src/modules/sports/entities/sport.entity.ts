import { League } from '../../leagues/entities/league.entity';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Player } from '../../players/entities/player.entity';
import { Country } from '../../countries/entities/country.entity';
import { Team } from '../../teams/entities/team.entity';
import { SportType } from '../../../common/entities/sport-type.entity';

@Index('sport_pkey', ['id'], { unique: true })
@Entity('sport', { schema: 'public' })
export class Sport {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('character varying', {
    name: 'provider_id',
    nullable: true,
    length: 50,
  })
  providerId: string | null;

  @ManyToOne(() => Country, (country) => country.sports)
  @JoinColumn([{ name: 'country_id', referencedColumnName: 'id' }])
  country: Country;

  @ManyToOne(() => League, (league) => league.sports)
  @JoinColumn([{ name: 'league_id', referencedColumnName: 'id' }])
  league: League;

  @ManyToOne(() => Player, (player) => player.sports)
  @JoinColumn([{ name: 'player_id', referencedColumnName: 'id' }])
  player: Player;

  @ManyToOne(() => Team, (team) => team.sports)
  @JoinColumn([{ name: 'team_id', referencedColumnName: 'id' }])
  team: Team;

  @ManyToOne(() => SportType, (sportType) => sportType.sports)
  @JoinColumn([{ name: 'type_id', referencedColumnName: 'id' }])
  type: SportType;
}
