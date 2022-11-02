import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Team } from './entities/team.entity';
import { AbstractDomainService } from '../../common/abstract-domain.service';

@Injectable()
export class TeamsService extends AbstractDomainService {
  constructor(
    @Inject('TEAM_REPOSITORY')
    repository: Repository<Team>,
  ) {
    super(repository);
  }
}
