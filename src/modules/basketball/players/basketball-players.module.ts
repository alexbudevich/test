import { Module } from '@nestjs/common';
import { BasketballPlayersService } from './basketball-players.service';
import { BasketballPlayersController } from './basketball-players.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BasketballPlayer } from './entities/basketball-player.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BasketballPlayer])],
  controllers: [BasketballPlayersController],
  providers: [BasketballPlayersService],
})
export class BasketballPlayersModule {}
