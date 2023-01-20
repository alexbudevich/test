import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
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
import { LoggerMiddleware } from './common/middlewares/logger-middleware';
import { SportsModule } from './modules/sports/sports.module';
import {APP_GUARD} from '@nestjs/core';
import {ThrottlerGuard, ThrottlerModule} from '@nestjs/throttler';

@Module({
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    }
  ],
  imports: [
    ThrottlerModule.forRoot({
      ttl: 10,
      limit: 10,
    }),
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
    SportsModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
