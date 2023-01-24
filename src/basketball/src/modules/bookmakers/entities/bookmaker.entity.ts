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
@Index('bookmaker_slug_idx', ['slug'], {})
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

  @Column('json', { name: 'overview', nullable: true })
  overview: object | null;

  @Column('json', { name: 'bonus_offer', nullable: true })
  bonusOffer: object | null;

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

  @Column('text', { name: 'slug', nullable: true })
  slug: string | null;

  @Column('text', { name: 's3_logo_url', nullable: true })
  s3LogoUrl: string | null;

  @Column('numeric', { name: 'rating', nullable: true })
  rating: string | null;

  @Column('text', { name: 'aff_link', nullable: true })
  affLink: string | null;

  @Column('boolean', { name: 'high_payout', nullable: true })
  highPayout: boolean | null;

  @Column('boolean', { name: 'live_stream', nullable: true })
  liveStream: boolean | null;

  @Column('boolean', { name: 'bet_builder', nullable: true })
  betBuilder: boolean | null;

  @Column('boolean', { name: 'cash_out', nullable: true })
  cashOut: boolean | null;

  @Column('boolean', { name: 'live_chat', nullable: true })
  liveChat: boolean | null;

  @Column('boolean', { name: 'casino', nullable: true })
  casino: boolean | null;

  @Column('boolean', { name: 'poker', nullable: true })
  poker: boolean | null;

  @Column('boolean', { name: 'mobile', nullable: true })
  mobile: boolean | null;

  @Column('boolean', { name: 'android', nullable: true })
  android: boolean | null;

  @Column('boolean', { name: 'ios', nullable: true })
  ios: boolean | null;

  @Column('boolean', { name: 'support_email', nullable: true })
  supportEmail: boolean | null;

  @Column('boolean', { name: 'support_phone', nullable: true })
  supportPhone: boolean | null;

  @Column('text', { name: 'description', nullable: true, select: false })
  description: string | null;

  @ManyToOne(() => Country, (country) => country.bookmakers)
  @JoinColumn([{ name: 'country_id', referencedColumnName: 'id' }])
  country: Country;

  @OneToMany(() => Odd, (odd) => odd.bookmaker)
  odds: Odd[];
}
