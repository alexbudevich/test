import { Test, TestingModule } from '@nestjs/testing';
import { BasketballPlayersController } from './basketball-players.controller';
import { BasketballPlayersService } from './basketball-players.service';

describe('PlayersController', () => {
  let controller: BasketballPlayersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BasketballPlayersController],
      providers: [BasketballPlayersService],
    }).compile();

    controller = module.get<BasketballPlayersController>(
      BasketballPlayersController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
