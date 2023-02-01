import { Test, TestingModule } from '@nestjs/testing';
import { BasketballTeamsService } from './basketball-teams.service';

describe('TeamsService', () => {
  let service: BasketballTeamsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BasketballTeamsService],
    }).compile();

    service = module.get<BasketballTeamsService>(BasketballTeamsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
