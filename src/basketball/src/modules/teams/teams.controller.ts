import { Controller, Get, Param, UseInterceptors } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { ApiQuery } from '@nestjs/swagger';
import { NotFoundInterceptor } from '../../common/interseptor/not-found-interceptor';

@Controller('basketball/teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Get()
  @ApiQuery({ name: 'page', type: Number, required: false })
  @ApiQuery({ name: 'limit', type: Number, required: false })
  findAll(@Paginate() query: PaginateQuery) {
    return this.teamsService.findAll(query);
  }

  @Get('slug/:slug')
  @UseInterceptors(NotFoundInterceptor)
  getBySlug(@Param('slug') slug: string) {
    return this.teamsService.getBySlug(slug);
  }

  // @Get('statistic/:id')
  // @UseInterceptors(NotFoundInterceptor)
  // teamStatistic(@Param('id') id: number) {
  //   return this.teamsService.teamStatistic(id);
  // }
}
