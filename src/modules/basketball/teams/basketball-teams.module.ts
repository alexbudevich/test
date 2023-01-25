import { Module } from '@nestjs/common';
import { BasketballTeamsService } from './basketball-teams.service';
import { BasketballTeamsController } from './basketball-teams.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BasketballTeam } from './entities/basketball-team.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BasketballTeam])],
  controllers: [BasketballTeamsController],
  providers: [BasketballTeamsService],
})
export class BasketballTeamsModule {}
