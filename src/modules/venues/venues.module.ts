import { Module } from '@nestjs/common';
import { VenuesService } from './venues.service';
import { VenuesController } from './venues.controller';
import {venueProviders} from "./venue.providers";
import {DatabaseModule} from "../../common/database/database.module";

@Module({
  imports: [DatabaseModule],
  controllers: [VenuesController],
  providers: [
      VenuesService,
      ...venueProviders,
  ],
})
export class VenuesModule {}
