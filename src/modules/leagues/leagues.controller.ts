import { Controller, Get, Param, UseInterceptors } from '@nestjs/common';
import { LeaguesService } from './leagues.service';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { ApiQuery } from '@nestjs/swagger';
import { NotFoundInterceptor } from '../../common/interseptor/not-found-interceptor';

@Controller('leagues')
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

  @Get('slug/:slug')
  @UseInterceptors(NotFoundInterceptor)
  getBySlug(@Param('slug') slug: string) {
    return this.leaguesService.getBySlug(slug);
  }
}
