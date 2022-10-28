import { Module } from '@nestjs/common';
import { SportsService } from './sports.service';
import { SportsController } from './sports.controller';
import {sportProviders} from "./sport.providers";
import {DatabaseModule} from "../../common/database/database.module";

@Module({
  imports: [DatabaseModule],
  controllers: [SportsController],
  providers: [
      SportsService,
      ...sportProviders,
  ],
})
export class SportsModule {}
