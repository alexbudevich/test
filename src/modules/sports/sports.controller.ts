import { Controller, Get, Param } from '@nestjs/common';
import { SportsService } from './sports.service';
import { Paginate, PaginateQuery } from 'nestjs-paginate';

@Controller('sports')
export class SportsController {
  constructor(private readonly sportsService: SportsService) {}

  @Get()
  findAll(@Paginate() query: PaginateQuery) {
    return this.sportsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.sportsService.findOne(id);
  }
}
