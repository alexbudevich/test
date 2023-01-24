import { Module } from '@nestjs/common';
import { MatchesService } from './matches.service';
import { MatchesController } from './matches.controller';
import { CountriesModule } from '../countries/countries.module';
import { LeaguesModule } from '../leagues/leagues.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Match } from './entities/basketball-match.entity';
import { Country } from '../countries/entities/country.entity';
import { League } from '../leagues/entities/league.entity';
import { Sport } from '../../common/entities/sport-type.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Match, Country, League, Sport]),
    CountriesModule,
    LeaguesModule,
  ],
  controllers: [MatchesController],
  providers: [MatchesService],
  exports: [MatchesService],
})
export class MatchesModule {}
