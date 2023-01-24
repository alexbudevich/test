import { Controller, Get, Param, UseInterceptors } from '@nestjs/common';
import { LeaguesService } from './leagues.service';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { NotFoundInterceptor } from '../../../common/interseptor/not-found-interceptor';

@Controller('leagues')
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
  @UseInterceptors(NotFoundInterceptor)
  getById(@Param('id') id: number) {
    return this.leaguesService.getById(id);
  }

  @Get('slug/:countrySlug/:leagueSlug')
  @UseInterceptors(NotFoundInterceptor)
  getBySlug(
    @Param('countrySlug') countrySlug: string,
    @Param('leagueSlug') leagueSlug: string,
  ) {
    return this.leaguesService.getBySlug(countrySlug, leagueSlug);
  }
}
