import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Sport } from './entities/sport.entity';
import { AbstractDomainService } from '../../common/abstract-domain.service';

@Injectable()
export class SportsService extends AbstractDomainService {
  constructor(
    @Inject('SPORT_REPOSITORY')
    repository: Repository<Sport>,
  ) {
    super(repository);
  }
}
