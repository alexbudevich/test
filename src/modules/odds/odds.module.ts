import { Module } from '@nestjs/common';
import { OddsService } from './odds.service';
import { OddsController } from './odds.controller';
import {oddProviders} from "./odd.providers";
import {DatabaseModule} from "../../common/database/database.module";

@Module({
  imports: [DatabaseModule],
  controllers: [OddsController],
  providers: [
      OddsService,
    ...oddProviders,
  ],
})
export class OddsModule {}
