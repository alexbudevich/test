import { Module } from '@nestjs/common';
import { OddsService } from './odds.service';
import { OddsController } from './odds.controller';

@Module({
  controllers: [OddsController],
  providers: [OddsService],
})
export class OddsModule {}
