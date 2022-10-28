import { Module } from '@nestjs/common';
import { RoundsService } from './rounds.service';
import { RoundsController } from './rounds.controller';
import {roundProviders} from "./round.providers";
import {DatabaseModule} from "../../common/database/database.module";

@Module({
  imports: [DatabaseModule],
  controllers: [RoundsController],
  providers: [
      RoundsService,
      ...roundProviders
  ],
})
export class RoundsModule {}
