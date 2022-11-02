import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Round } from './entities/round.entity';
import { AbstractDomainService } from '../../common/abstract-domain.service';

@Injectable()
export class RoundsService extends AbstractDomainService {
  constructor(
    @Inject('ROUND_REPOSITORY')
    repository: Repository<Round>,
  ) {
    super(repository);
  }
}
