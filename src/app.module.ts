import { Module } from '@nestjs/common';
import { DatabaseModule } from './common/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { BookmakersModule } from './modules/bookmakers/bookmakers.module';
import { CountriesModule } from './modules/countries/countries.module';
import { OddsModule } from './modules/odds/odds.module';
import { LeaguesModule } from './modules/leagues/leagues.module';
import { MatchesModule } from './modules/matches/matches.module';
import { PlayersModule } from './modules/players/players.module';
import { RoundsModule } from './modules/rounds/rounds.module';
import { SeasonsModule } from './modules/seasons/seasons.module';
import { TeamsModule } from './modules/teams/teams.module';
import { VenuesModule } from './modules/venues/venues.module';
import { HealthcheckModule } from './healthcheck/healthcheck.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    BookmakersModule,
    CountriesModule,
    OddsModule,
    LeaguesModule,
    MatchesModule,
    PlayersModule,
    RoundsModule,
    SeasonsModule,
    TeamsModule,
    VenuesModule,
    HealthcheckModule,
  ],
})
export class AppModule {}
