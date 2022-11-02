import { Controller, Get, Param } from '@nestjs/common';
import { OddsService } from './odds.service';
import { Paginate, PaginateQuery } from 'nestjs-paginate';

@Controller('odds')
export class OddsController {
  constructor(private readonly oddsService: OddsService) {}

  @Get()
  findAll(@Paginate() query: PaginateQuery) {
    return this.oddsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.oddsService.findOne(id);
  }
}
