import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Country } from '../../modules/countries/entities/country.entity';
import { Repository } from 'typeorm';
import { BasketballLeague } from '../../modules/basketball/leagues/entities/basketball-league.entity';
import { UrlValidatorMiddleware } from './url-validator.middleware';

@Injectable()
export class BasketballUrlValidatorMiddleware extends UrlValidatorMiddleware {
  constructor(
    @InjectRepository(Country)
    private country: Repository<Country>,
    @InjectRepository(BasketballLeague)
    private league: Repository<BasketballLeague>,
  ) {
    super(country, league);
  }
}
