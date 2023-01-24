import { Test, TestingModule } from '@nestjs/testing';
import { BookmakersController } from './bookmakers.controller';
import { BookmakersService } from './bookmakers.service';

describe('BookmakersController', () => {
  let controller: BookmakersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookmakersController],
      providers: [BookmakersService],
    }).compile();

    controller = module.get<BookmakersController>(BookmakersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
