import { Controller, Get, Param } from '@nestjs/common';
import { MatchesService } from './matches.service';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { ApiQuery } from '@nestjs/swagger';

@Controller('matches')
export class MatchesController {
  constructor(private readonly matchesService: MatchesService) {}

  @Get()
  @ApiQuery({ name: 'page', type: Number, required: false })
  @ApiQuery({ name: 'limit', type: Number, required: false })
  findAll(@Paginate() query: PaginateQuery) {
    return this.matchesService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.matchesService.findOne(id);
  }
}
