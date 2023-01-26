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
import { BasketballPlayersModule } from './modules/basketball/players/basketball-players.module';
import { BasketballUrlValidatorMiddleware } from './common/middlewares/basketball-url-valitador.middleware';
import { Country } from './modules/countries/entities/country.entity';
import { BasketballLeague } from './modules/basketball/leagues/entities/basketball-league.entity';
import { League } from './modules/football/leagues/entities/league.entity';
import { FootballUrlValidatorMiddleware } from './common/middlewares/football-url-valitador.middleware';

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
    TypeOrmModule.forFeature([Country, League, BasketballLeague]),
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
    consumer
      .apply(BasketballUrlValidatorMiddleware)
      .exclude('basketball/matches/team/*')
      .forRoutes('basketball/matches/*/search');
    consumer
      .apply(FootballUrlValidatorMiddleware)
      .forRoutes('football/matches/*/search');
  }
}
