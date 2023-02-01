import { Test, TestingModule } from '@nestjs/testing';
import { BasketballPlayersService } from './basketball-players.service';

describe('PlayersService', () => {
  let service: BasketballPlayersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BasketballPlayersService],
    }).compile();

    service = module.get<BasketballPlayersService>(BasketballPlayersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
