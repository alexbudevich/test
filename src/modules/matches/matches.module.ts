import { Module } from '@nestjs/common';
import { MatchesService } from './matches.service';
import { MatchesController } from './matches.controller';
import { matchProviders } from './match.providers';
import { DatabaseModule } from '../../common/database/database.module';
import { CountriesModule } from '../countries/countries.module';
import { LeaguesModule } from '../leagues/leagues.module';
import { SportsModule } from '../sports/sports.module';

@Module({
  imports: [DatabaseModule, CountriesModule, LeaguesModule, SportsModule],
  controllers: [MatchesController],
  providers: [MatchesService, ...matchProviders],
  exports: [MatchesService],
})
export class MatchesModule {}
