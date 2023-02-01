import { Test, TestingModule } from '@nestjs/testing';
import { BasketballOddsService } from './basketball-odds.service';

describe('OddsService', () => {
  let service: BasketballOddsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BasketballOddsService],
    }).compile();

    service = module.get<BasketballOddsService>(BasketballOddsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
