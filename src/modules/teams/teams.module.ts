import { Module } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { TeamsController } from './teams.controller';
import {teamProviders} from "./team.providers";
import {DatabaseModule} from "../../common/database/database.module";

@Module({
  imports: [DatabaseModule],
  controllers: [TeamsController],
  providers: [
      TeamsService,
      ...teamProviders,
  ],
})
export class TeamsModule {}
