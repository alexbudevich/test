import { Test, TestingModule } from '@nestjs/testing';
import { BasketballLeaguesController } from './basketball-leagues.controller';
import { LeaguesService } from './basketball-leagues.service';

describe('LeaguesController', () => {
  let controller: BasketballLeaguesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BasketballLeaguesController],
      providers: [LeaguesService],
    }).compile();

    controller = module.get<BasketballLeaguesController>(BasketballLeaguesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
