import { Module } from '@nestjs/common';
import { BasketballOddsService } from './basketball-odds.service';
import { BasketballOddsController } from './basketball-odds.controller';
import { BasketballMatchesModule } from '../matches/basketball-matches.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bookmaker } from '../../bookmakers/entities/bookmaker.entity';
import { BookmakersModule } from '../../bookmakers/bookmakers.module';
import { BasketballOdd } from './entities/basketball-odd.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([BasketballOdd, Bookmaker]),
    BasketballMatchesModule,
    BookmakersModule,
  ],
  controllers: [BasketballOddsController],
  providers: [BasketballOddsService],
})
export class BasketballOddsModule {}
