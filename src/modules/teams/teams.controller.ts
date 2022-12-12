import { Controller, Get, Param } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { ApiQuery } from '@nestjs/swagger';

@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Get()
  @ApiQuery({ name: 'page', type: Number, required: false })
  @ApiQuery({ name: 'limit', type: Number, required: false })
  findAll(@Paginate() query: PaginateQuery) {
    return this.teamsService.findAll(query);
  }

  @Get(':id')
  getById(@Param('id') id: number) {
    return this.teamsService.getById(id);
  }

  @Get('slug/:slug')
  getBySlug(@Param('slug') slug: string) {
    return this.teamsService.getBySlug(slug);
  }

  @Get('statistic/:id')
  teamStatistic(@Param('id') id: number) {
    return this.teamsService.teamStatistic(id);
  }
}
