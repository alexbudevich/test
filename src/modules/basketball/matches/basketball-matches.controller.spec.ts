import { Test, TestingModule } from '@nestjs/testing';
import { BasketballMatchesController } from './basketball-matches.controller';
import { BasketballMatchesService } from './basketball-matches.service';

describe('MatchesController', () => {
  let controller: BasketballMatchesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BasketballMatchesController],
      providers: [BasketballMatchesService],
    }).compile();

    controller = module.get<BasketballMatchesController>(
      BasketballMatchesController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
