import { Module } from '@nestjs/common';
import { TimeZonesService } from './time-zones.service';
import { TimeZonesController } from './time-zones.controller';

@Module({
  controllers: [TimeZonesController],
  providers: [TimeZonesService],
})
export class TimeZonesModule {}
