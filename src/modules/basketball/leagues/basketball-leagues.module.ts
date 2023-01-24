import { Module } from '@nestjs/common';
import { BasketballLeaguesService } from './basketball-leagues.service';
import { BasketballLeaguesController } from './basketball-leagues.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BasketballLeague } from './entities/basketball-league.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BasketballLeague])],
  controllers: [BasketballLeaguesController],
  providers: [BasketballLeaguesService],
})
export class BasketballLeaguesModule {}
