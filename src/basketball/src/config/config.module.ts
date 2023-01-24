import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ApiConfigService } from './config.service';
import validationSchema from './validation.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: validationSchema(),
      expandVariables: true,
    }),
  ],
  providers: [ApiConfigService],
  exports: [ApiConfigService],
})
export class AppConfigModule {}
