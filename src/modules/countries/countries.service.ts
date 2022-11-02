import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Bookmaker } from '../bookmakers/entities/bookmaker.entity';
import { AbstractDomainService } from '../../common/abstract-domain.service';

@Injectable()
export class CountriesService extends AbstractDomainService {
  constructor(
    @Inject('COUNTRY_REPOSITORY')
    repository: Repository<Bookmaker>,
  ) {
    super(repository);
  }
}
