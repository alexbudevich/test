import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
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
import { SportsModule } from './modules/sports/sports.module';
import { TeamsModule } from './modules/teams/teams.module';
import { TimeZonesModule } from './modules/time-zones/time-zones.module';
import { VenuesModule } from './modules/venues/venues.module';

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
    SportsModule,
    TeamsModule,
    TimeZonesModule,
    VenuesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
