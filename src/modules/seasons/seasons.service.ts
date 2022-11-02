import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Season } from './entities/season.entity';
import { AbstractDomainService } from '../../common/abstract-domain.service';

@Injectable()
export class SeasonsService extends AbstractDomainService {
  constructor(
    @Inject('SEASON_REPOSITORY')
    repository: Repository<Season>,
  ) {
    super(repository);
  }
}
