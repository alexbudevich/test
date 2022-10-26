import { Test, TestingModule } from '@nestjs/testing';
import { BookmakersService } from './bookmakers.service';

describe('BookmakersService', () => {
  let service: BookmakersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BookmakersService],
    }).compile();

    service = module.get<BookmakersService>(BookmakersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
