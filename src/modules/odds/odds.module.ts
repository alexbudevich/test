import { Module } from '@nestjs/common';
import { OddsService } from './odds.service';
import { OddsController } from './odds.controller';
import { oddProviders } from './odd.providers';
import { DatabaseModule } from '../../common/database/database.module';
import { MatchesModule } from '../matches/matches.module';

@Module({
  imports: [DatabaseModule, MatchesModule],
  controllers: [OddsController],
  providers: [OddsService, ...oddProviders],
})
export class OddsModule {}
