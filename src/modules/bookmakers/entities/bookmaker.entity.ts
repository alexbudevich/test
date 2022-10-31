import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Country } from '../../countries/entities/country.entity';
import { Odd } from '../../odds/entities/odd.entity';

@Index('pk_1', ['id'], { unique: true })
@Entity('bookmaker', { schema: 'public' })
export class Bookmaker {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('character varying', { name: 'name', length: 50 })
  name: string;

  @Column('text', { name: 'logo', nullable: true })
  logo: string | null;

  @Column('numeric', { name: 'rank', nullable: true })
  rank: string | null;

  @Column('numeric', { name: 'user_rank', nullable: true })
  userRank: string | null;

  @Column('numeric', { name: 'avg_payout', nullable: true })
  avgPayout: string | null;

  @Column('numeric', { name: 'payout_speed', nullable: true })
  payoutSpeed: string | null;

  @Column('text', { name: 'apps', nullable: true, array: true })
  apps: string[] | null;

  @Column('boolean', { name: 'cashout', nullable: true })
  cashout: boolean | null;

  @Column('boolean', { name: 'live_stream', nullable: true })
  liveStream: boolean | null;

  @Column('boolean', { name: 'bet_builder', nullable: true })
  betBuilder: boolean | null;

  @Column('json', { name: 'overview', nullable: true })
  overview: object | null;

  @Column('json', { name: 'bonus_offer', nullable: true })
  bonusOffer: object | null;

  @Column('text', {
    name: 'bank_limits_payment_methods',
    nullable: true,
    array: true,
  })
  bankLimitsPaymentMethods: string[] | null;

  @Column('text', {
    name: 'bank_limits_accept_currencies',
    nullable: true,
    array: true,
  })
  bankLimitsAcceptCurrencies: string[] | null;

  @Column('json', { name: 'bank_limits_limits', nullable: true })
  bankLimitsLimits: object | null;

  @ManyToOne(() => Country, (country) => country.bookmakers)
  @JoinColumn([{ name: 'country_id', referencedColumnName: 'id' }])
  country: Country;

  @OneToMany(() => Odd, (odd) => odd.bookmaker)
  odds: Odd[];
}
