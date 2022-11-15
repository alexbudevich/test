import { Controller, Get, Param } from '@nestjs/common';
import { OddsService } from './odds.service';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { ApiQuery } from '@nestjs/swagger';

@Controller('odds')
export class OddsController {
  constructor(private readonly oddsService: OddsService) {}

  @Get()
  @ApiQuery({ name: 'page', type: Number, required: false })
  @ApiQuery({ name: 'limit', type: Number, required: false })
  findAll(@Paginate() query: PaginateQuery) {
    return this.oddsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.oddsService.findOne(id);
  }
}
