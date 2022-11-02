import { Controller, Get, Param } from '@nestjs/common';
import { LeaguesService } from './leagues.service';
import { Paginate, PaginateQuery } from 'nestjs-paginate';

@Controller('leagues')
export class LeaguesController {
  constructor(private readonly leaguesService: LeaguesService) {}

  @Get()
  findAll(@Paginate() query: PaginateQuery) {
    return this.leaguesService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.leaguesService.findOne(id);
  }
}
