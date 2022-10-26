import { databaseProviders } from './database.providers';
import { Module } from '@nestjs/common';
import { PostgresConfigModule } from '../../config/database/pg';

@Module({
  imports: [PostgresConfigModule],
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
