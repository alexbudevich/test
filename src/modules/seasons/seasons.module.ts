import { Module } from '@nestjs/common';
import { SeasonsService } from './seasons.service';
import { SeasonsController } from './seasons.controller';
import {seasonProviders} from "./season.providers";
import {DatabaseModule} from "../../common/database/database.module";

@Module({
  imports: [DatabaseModule],
  controllers: [SeasonsController],
  providers: [
    SeasonsService,
    ...seasonProviders,
  ],
})
export class SeasonsModule {

}
