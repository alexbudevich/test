import { Test, TestingModule } from '@nestjs/testing';
import { OddsController } from './odds.controller';
import { OddsService } from './odds.service';

describe('OddsController', () => {
  let controller: OddsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OddsController],
      providers: [OddsService],
    }).compile();

    controller = module.get<OddsController>(OddsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
