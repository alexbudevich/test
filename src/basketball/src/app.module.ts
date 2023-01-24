import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BookmakersModule } from './modules/bookmakers/bookmakers.module';
import { CountriesModule } from './modules/countries/countries.module';
import { OddsModule } from './modules/odds/odds.module';
import { LeaguesModule } from './modules/leagues/leagues.module';
import { MatchesModule } from './modules/matches/matches.module';
import { PlayersModule } from './modules/players/players.module';
import { SeasonsModule } from './modules/seasons/seasons.module';
import { TeamsModule } from './modules/teams/teams.module';
import { HealthcheckModule } from './healthcheck/healthcheck.module';
import { LoggerMiddleware } from './common/middlewares/logger-middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiConfigService, AppConfigModule } from './config';

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
    SeasonsModule,
    TeamsModule,
    HealthcheckModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
