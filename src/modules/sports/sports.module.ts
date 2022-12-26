import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../common/database/database.module';
import { sportProviders } from './sport-type.provider';

@Module({
  imports: [DatabaseModule],
  providers: [...sportProviders],
  exports: [...sportProviders],
})
export class SportsModule {}
