import { Module } from '@nestjs/common';
import { TimeZonesService } from './time-zones.service';
import { TimeZonesController } from './time-zones.controller';
import {timezoneProviders} from "./timezone.providers";
import {DatabaseModule} from "../../common/database/database.module";

@Module({
  imports: [DatabaseModule],
  controllers: [TimeZonesController],
  providers: [
      TimeZonesService,
      ...timezoneProviders,
  ],
})
export class TimeZonesModule {}
