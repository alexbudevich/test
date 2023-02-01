import { Module } from '@nestjs/common';
import { BasketballOddsService } from './basketball-odds.service';
import { BasketballOddsController } from './basketball-odds.controller';
import { BasketballMatchesModule } from '../matches/basketball-matches.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookmakersModule } from '../../bookmakers/bookmakers.module';
import { BasketballOdd } from './entities/basketball-odd.entity';
import { BasketballBookmakerEntity } from '../../bookmakers/entities/basketball-bookmaker.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([BasketballOdd, BasketballBookmakerEntity]),
    BasketballMatchesModule,
    BookmakersModule,
  ],
  controllers: [BasketballOddsController],
  providers: [BasketballOddsService],
})
export class BasketballOddsModule {}
