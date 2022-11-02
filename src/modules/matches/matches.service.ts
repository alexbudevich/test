import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Match } from './entities/match.entity';
import { AbstractDomainService } from '../../common/abstract-domain.service';

@Injectable()
export class MatchesService extends AbstractDomainService {
  constructor(
    @Inject('MATCH_REPOSITORY')
    repository: Repository<Match>,
  ) {
    super(repository);
  }
}
