import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Bookmaker } from './entities/bookmaker.entity';
import { AbstractDomainService } from '../../common/abstract-domain.service';

@Injectable()
export class BookmakersService extends AbstractDomainService {
  constructor(
    @Inject('BOOKMAKER_REPOSITORY')
    repository: Repository<Bookmaker>,
  ) {
    super(repository);
  }
}
