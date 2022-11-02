import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { League } from './entities/league.entity';
import { AbstractDomainService } from '../../common/abstract-domain.service';

@Injectable()
export class LeaguesService extends AbstractDomainService {
  constructor(
    @Inject('LEAGUE_REPOSITORY')
    repository: Repository<League>,
  ) {
    super(repository);
  }
}
