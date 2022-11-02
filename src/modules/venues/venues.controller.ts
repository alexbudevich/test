import { Controller, Get, Param } from '@nestjs/common';
import { VenuesService } from './venues.service';
import { Paginate, PaginateQuery } from 'nestjs-paginate';

@Controller('venues')
export class VenuesController {
  constructor(private readonly venuesService: VenuesService) {}

  @Get()
  findAll(@Paginate() query: PaginateQuery) {
    return this.venuesService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.venuesService.findOne(id);
  }
}
