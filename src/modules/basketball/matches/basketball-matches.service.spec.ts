import { Test, TestingModule } from '@nestjs/testing';
import { BasketballMatchesService } from './basketball-matches.service';

describe('MatchesService', () => {
  let service: BasketballMatchesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BasketballMatchesService],
    }).compile();

    service = module.get<BasketballMatchesService>(BasketballMatchesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
