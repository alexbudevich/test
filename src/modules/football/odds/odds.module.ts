import { Module } from '@nestjs/common';
import { OddsService } from './odds.service';
import { OddsController } from './odds.controller';
import { MatchesModule } from '../matches/matches.module';
import { BookmakersModule } from '../../bookmakers/bookmakers.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Odd } from './entities/odd.entity';
import { FootballBookmakerEntity } from '../../bookmakers/entities/football-bookmaker.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Odd, FootballBookmakerEntity]),
    MatchesModule,
    BookmakersModule,
  ],
  controllers: [OddsController],
  providers: [OddsService],
})
export class OddsModule {}
