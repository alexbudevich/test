import { Controller, Get, Param } from '@nestjs/common';
import { SeasonsService } from './seasons.service';
import { Paginate, PaginateQuery } from 'nestjs-paginate';

@Controller('seasons')
export class SeasonsController {
  constructor(private readonly seasonsService: SeasonsService) {}

  @Get()
  findAll(@Paginate() query: PaginateQuery) {
    return this.seasonsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.seasonsService.findOne(id);
  }
}
