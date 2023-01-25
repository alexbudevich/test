import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BookmakersModule } from './modules/bookmakers/bookmakers.module';
import { CountriesModule } from './modules/countries/countries.module';
import { OddsModule } from './modules/football/odds/odds.module';
import { LeaguesModule } from './modules/football/leagues/leagues.module';
import { MatchesModule } from './modules/football/matches/matches.module';
import { PlayersModule } from './modules/football/players/players.module';
import { RoundsModule } from './modules/football/rounds/rounds.module';
import { SeasonsModule } from './modules/seasons/seasons.module';
import { TeamsModule } from './modules/football/teams/teams.module';
import { VenuesModule } from './modules/football/venues/venues.module';
import { HealthcheckModule } from './healthcheck/healthcheck.module';
import { LoggerMiddleware } from './common/middlewares/logger-middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiConfigService, AppConfigModule } from './config';
import { BasketballLeaguesModule } from './modules/basketball/leagues/basketball-leagues.module';
import { BasketballMatchesModule } from './modules/basketball/matches/basketball-matches.module';
import { BasketballOddsModule } from './modules/basketball/odds/basketball-odds.module';
import { BasketballTeamsModule } from './modules/basketball/teams/basketball-teams.module';
import { BasketballPlayer } from './modules/basketball/players/entities/basketball-player.entity';
import { BasketballPlayersModule } from './modules/basketball/players/basketball-players.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [AppConfigModule],
      useFactory: (configService: ApiConfigService) =>
        configService.postgresConfig,
      inject: [ApiConfigService],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
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
    BasketballLeaguesModule,
    BasketballMatchesModule,
    BasketballOddsModule,
    BasketballTeamsModule,
    BasketballPlayersModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
