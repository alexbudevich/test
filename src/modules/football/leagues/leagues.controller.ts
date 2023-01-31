import { Controller, Get, Param, UseInterceptors } from '@nestjs/common';
import { LeaguesService } from './leagues.service';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { NotFoundInterceptor } from '../../../common/interseptor/not-found-interceptor';

@Controller('football/leagues')
@ApiTags('Football')
export class LeaguesController {
  constructor(private readonly leaguesService: LeaguesService) {}

  @Get()
  @ApiQuery({ name: 'page', type: Number, required: false })
  @ApiQuery({ name: 'limit', type: Number, required: false })
  findAll(@Paginate() query: PaginateQuery) {
    return this.leaguesService.findAll(query);
  }

  @Get('/top-leagues')
  findTopLeagues() {
    return this.leaguesService.findTopLeagues();
  }

  @Get(':id')
  @ApiOperation({ deprecated: true })
  @UseInterceptors(NotFoundInterceptor)
  getById(@Param('id') id: number) {
    return this.leaguesService.getById(id);
  }

  @Get('slug/:country/:league')
  @UseInterceptors(NotFoundInterceptor)
  getBySlug(
    @Param('country') country: string,
    @Param('league') league: string,
  ) {
    return this.leaguesService.getBySlug(country, league);
  }

  @Get('grouped/groupedByCountry')
  @UseInterceptors(NotFoundInterceptor)
  getGroupedByCountry() {
    return this.leaguesService.getGroupedByCountry();
  }
}
