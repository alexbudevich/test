import { Module } from '@nestjs/common';
import { BasketballMatchesService } from './basketball-matches.service';
import { BasketballMatchesController } from './basketball-matches.controller';
import { BasketballLeaguesModule } from '../leagues/basketball-leagues.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BasketballMatch } from './entities/basketball-match.entity';
import { BasketballLeague } from '../leagues/entities/basketball-league.entity';
import { Country } from '../../countries/entities/country.entity';
import { CountriesModule } from '../../countries/countries.module';
import { SportType } from '../../../common/entities/sport-type.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      BasketballMatch,
      Country,
      BasketballLeague,
      SportType,
    ]),
    CountriesModule,
    BasketballLeaguesModule,
  ],
  controllers: [BasketballMatchesController],
  providers: [BasketballMatchesService],
  exports: [BasketballMatchesService],
})
export class BasketballMatchesModule {}
