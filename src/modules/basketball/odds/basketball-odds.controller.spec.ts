import { Test, TestingModule } from '@nestjs/testing';
import { BasketballOddsController } from './basketball-odds.controller';
import { BasketballOddsService } from './basketball-odds.service';

describe('OddsController', () => {
  let controller: BasketballOddsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BasketballOddsController],
      providers: [BasketballOddsService],
    }).compile();

    controller = module.get<BasketballOddsController>(BasketballOddsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
