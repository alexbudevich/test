import { Module } from '@nestjs/common';
import { OddsService } from './odds.service';
import { OddsController } from './odds.controller';
import { MatchesModule } from '../matches/matches.module';
import { BookmakersModule } from '../../bookmakers/bookmakers.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Odd } from './entities/odd.entity';
import { Bookmaker } from '../../bookmakers/entities/bookmaker.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Odd, Bookmaker]),
    MatchesModule,
    BookmakersModule,
  ],
  controllers: [OddsController],
  providers: [OddsService],
})
export class OddsModule {}
