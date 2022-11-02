import { Controller, Get, Param } from '@nestjs/common';
import { MatchesService } from './matches.service';
import { Paginate, PaginateQuery } from 'nestjs-paginate';

@Controller('matches')
export class MatchesController {
  constructor(private readonly matchesService: MatchesService) {}

  @Get()
  findAll(@Paginate() query: PaginateQuery) {
    return this.matchesService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.matchesService.findOne(id);
  }
}
