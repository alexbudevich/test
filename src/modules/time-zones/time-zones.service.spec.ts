import { Test, TestingModule } from '@nestjs/testing';
import { TimeZonesService } from './time-zones.service';

describe('TimeZonesService', () => {
  let service: TimeZonesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TimeZonesService],
    }).compile();

    service = module.get<TimeZonesService>(TimeZonesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
