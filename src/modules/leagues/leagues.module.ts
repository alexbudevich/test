import { Module } from '@nestjs/common';
import { LeaguesService } from './leagues.service';
import { LeaguesController } from './leagues.controller';
import { DatabaseModule } from '../../common/database/database.module';
import { leagueProviders } from './league.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [LeaguesController],
  providers: [LeaguesService, ...leagueProviders],
  exports: [...leagueProviders],
})
export class LeaguesModule {}
