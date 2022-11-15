import { Controller, Get, Param } from '@nestjs/common';
import { RoundsService } from './rounds.service';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { ApiQuery } from '@nestjs/swagger';

@Controller('rounds')
export class RoundsController {
  constructor(private readonly roundsService: RoundsService) {}

  @Get()
  @ApiQuery({ name: 'page', type: Number, required: false })
  @ApiQuery({ name: 'limit', type: Number, required: false })
  findAll(@Paginate() query: PaginateQuery) {
    return this.roundsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.roundsService.findOne(id);
  }
}
