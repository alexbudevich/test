import { Controller, Get, Param } from '@nestjs/common';
import { SportsService } from './sports.service';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { ApiQuery } from '@nestjs/swagger';

@Controller('sports')
export class SportsController {
  constructor(private readonly sportsService: SportsService) {}

  @Get()
  @ApiQuery({ name: 'page', type: Number, required: false })
  @ApiQuery({ name: 'limit', type: Number, required: false })
  findAll(@Paginate() query: PaginateQuery) {
    return this.sportsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.sportsService.findOne(id);
  }
}
