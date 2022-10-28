import { Module } from '@nestjs/common';
import { PlayersService } from './players.service';
import { PlayersController } from './players.controller';
import {playerProviders} from "./player.providers";
import {DatabaseModule} from "../../common/database/database.module";

@Module({
  imports: [DatabaseModule],
  controllers: [PlayersController],
  providers: [
      PlayersService,
      ...playerProviders
  ],
})
export class PlayersModule {}
