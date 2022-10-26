import { Test, TestingModule } from '@nestjs/testing';
import { TimeZonesController } from './time-zones.controller';
import { TimeZonesService } from './time-zones.service';

describe('TimeZonesController', () => {
  let controller: TimeZonesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TimeZonesController],
      providers: [TimeZonesService],
    }).compile();

    controller = module.get<TimeZonesController>(TimeZonesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
