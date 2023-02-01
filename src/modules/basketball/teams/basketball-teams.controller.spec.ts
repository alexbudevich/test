import { Test, TestingModule } from '@nestjs/testing';
import { BasketballTeamsController } from './basketball-teams.controller';
import { BasketballTeamsService } from './basketball-teams.service';

describe('TeamsController', () => {
  let controller: BasketballTeamsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BasketballTeamsController],
      providers: [BasketballTeamsService],
    }).compile();

    controller = module.get<BasketballTeamsController>(BasketballTeamsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
