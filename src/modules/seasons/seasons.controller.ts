import { Controller, Get, Param } from '@nestjs/common';
import { SeasonsService } from './seasons.service';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { ApiQuery } from '@nestjs/swagger';

@Controller('seasons')
export class SeasonsController {
  constructor(private readonly seasonsService: SeasonsService) {}

  @Get()
  @ApiQuery({ name: 'page', type: Number, required: false })
  @ApiQuery({ name: 'limit', type: Number, required: false })
  findAll(@Paginate() query: PaginateQuery) {
    return this.seasonsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.seasonsService.findOne(id);
  }
}
