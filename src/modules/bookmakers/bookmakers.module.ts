import { Module } from '@nestjs/common';
import { BookmakersService } from './bookmakers.service';
import { BookmakersController } from './bookmakers.controller';

@Module({
  controllers: [BookmakersController],
  providers: [BookmakersService],
})
export class BookmakersModule {}
