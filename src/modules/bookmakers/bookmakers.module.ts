import { Module } from '@nestjs/common';
import { BookmakersService } from './bookmakers.service';
import { BookmakersController } from './bookmakers.controller';
import { bookmakerProviders } from './bookmaker.providers';
import { DatabaseModule } from '../../common/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [BookmakersController],
  providers: [BookmakersService, ...bookmakerProviders],
  exports: [...bookmakerProviders],
})
export class BookmakersModule {}
