import { NestMiddleware, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';

export class UrlValidatorMiddleware implements NestMiddleware {
  constructor(
    private countryRepository: Repository<any>,
    private leagueRepository: Repository<any>,
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const splitUrl = req.baseUrl.split('/');

    if (splitUrl.length == 6) {
      const leagueCountry = await this.leagueRepository
        .createQueryBuilder('league')
        .leftJoin('league.country', 'country')
        .leftJoin('league.sportType', 'sportType')
        .where('league.slug = :leagueSlug', { leagueSlug: splitUrl[4] })
        .andWhere('country.slug = :countrySlug', {
          countrySlug: splitUrl[3],
        })
        .andWhere('sportType.slug = :sportType', { sportType: 'basketball' })
        .getOne();
      if (!leagueCountry) {
        throw new NotFoundException('leagueCountry');
      }
      next();
    } else if (splitUrl.length == 5) {
      const country = await this.countryRepository.findOne({
        where: {
          slug: splitUrl[3],
        },
      });
      if (!country) {
        throw new NotFoundException('country');
      }
      next();
    } else {
      throw new NotFoundException();
    }
  }
}