import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Player } from './entities/player.entity';
import { AbstractDomainService } from '../../common/abstract-domain.service';

@Injectable()
export class PlayersService extends AbstractDomainService {
  constructor(
    @Inject('PLAYER_REPOSITORY')
    repository: Repository<Player>,
  ) {
    super(repository);
  }
}
