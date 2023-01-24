import { Module } from '@nestjs/common';
import { MatchesService } from './matches.service';
import { MatchesController } from './matches.controller';
import { CountriesModule } from '../../countries/countries.module';
import { LeaguesModule } from '../leagues/leagues.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Match } from './entities/match.entity';
import { Country } from '../../countries/entities/country.entity';
import { League } from '../leagues/entities/league.entity';
import { SportType } from '../../../common/entities/sport-type.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Match, Country, League, SportType]),
    CountriesModule,
    LeaguesModule,
  ],
  controllers: [MatchesController],
  providers: [MatchesService],
  exports: [MatchesService],
})
export class MatchesModule {}
