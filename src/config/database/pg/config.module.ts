import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PostgresConfigService } from './config.service';
import configuration from './configuration';
import validationSchema from './validation.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: validationSchema(),
      expandVariables: true,
    }),
  ],
  providers: [ConfigService, PostgresConfigService],
  exports: [ConfigService, PostgresConfigService],
})
export class PostgresConfigModule {}
