import { Module } from '@nestjs/common';
import { BookmakersService } from './bookmakers.service';
import { BookmakersController } from './bookmakers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bookmaker } from './entities/bookmaker.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Bookmaker])],
  controllers: [BookmakersController],
  providers: [BookmakersService],
  exports: [],
})
export class BookmakersModule {}
