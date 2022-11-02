import { Controller, Get, Param } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { Paginate, PaginateQuery } from 'nestjs-paginate';

@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Get()
  findAll(@Paginate() query: PaginateQuery) {
    return this.teamsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.teamsService.findOne(id);
  }
}
