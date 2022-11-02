import { Controller, Get, Param } from '@nestjs/common';
import { RoundsService } from './rounds.service';
import { Paginate, PaginateQuery } from 'nestjs-paginate';

@Controller('rounds')
export class RoundsController {
  constructor(private readonly roundsService: RoundsService) {}

  @Get()
  findAll(@Paginate() query: PaginateQuery) {
    return this.roundsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.roundsService.findOne(id);
  }
}
