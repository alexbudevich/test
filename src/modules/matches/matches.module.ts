import { Module } from '@nestjs/common';
import { MatchesService } from './matches.service';
import { MatchesController } from './matches.controller';
import {matchProviders} from "./match.providers";
import {DataSource} from "typeorm";
import {DatabaseModule} from "../../common/database/database.module";

@Module({
  imports: [DatabaseModule],
  controllers: [MatchesController],
  providers: [
      MatchesService,
      ...matchProviders
  ],
})
export class MatchesModule {}
