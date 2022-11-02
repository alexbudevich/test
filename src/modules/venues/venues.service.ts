import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Venue } from './entities/venue.entity';
import { AbstractDomainService } from '../../common/abstract-domain.service';

@Injectable()
export class VenuesService extends AbstractDomainService {
  constructor(
    @Inject('VENUE_REPOSITORY')
    repository: Repository<Venue>,
  ) {
    super(repository);
  }
}
