import { Module } from '@nestjs/common';
import { RoundsService } from './rounds.service';
import { RoundsController } from './rounds.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Round } from './entities/round.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Round])],
  controllers: [RoundsController],
  providers: [RoundsService],
})
export class RoundsModule {}
