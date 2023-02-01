import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Country } from '../../modules/countries/entities/country.entity';
import { Repository } from 'typeorm';
import { League } from '../../modules/football/leagues/entities/league.entity';
import { UrlValidatorMiddleware } from './url-validator.middleware';

@Injectable()
export class FootballUrlValidatorMiddleware extends UrlValidatorMiddleware {
  constructor(
    @InjectRepository(Country)
    private country: Repository<Country>,
    @InjectRepository(League)
    private league: Repository<League>,
  ) {
    super(country, league);
  }
}
