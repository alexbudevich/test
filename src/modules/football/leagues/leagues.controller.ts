import { Controller, Get, Param, UseInterceptors } from '@nestjs/common';
import { LeaguesService } from './leagues.service';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { NotFoundInterceptor } from '../../../common/interseptor/not-found-interceptor';
import { QueryDTO } from '../matches/dto/query.dto';

@Controller('football/leagues')
@ApiTags('Football')
export class LeaguesController {
  constructor(private readonly leaguesService: LeaguesService) {}

  @Get()
  @ApiQuery({ type: QueryDTO, required: false })
  findAll(@Paginate() query: PaginateQuery) {
    return this.leaguesService.findAll(query);
  }

  @Get('/top-leagues')
  @ApiOperation({ deprecated: true })
  getTopLeagues() {
    return this.leaguesService.findTopLeagues();
  }

  @Get('/country-leagues')
  getCountryLeagues() {
    return this.leaguesService.getCountryLeagues();
  }

  @Get(':country')
  getByCountry(@Param('country') country: string) {
    return this.leaguesService.getByCountry(country);
  }

  @Get(':country/:league')
  @UseInterceptors(NotFoundInterceptor)
  getBySlug(
    @Param('country') country: string,
    @Param('league') league: string,
  ) {
    return this.leaguesService.getBySlug(country, league);
  }
}
