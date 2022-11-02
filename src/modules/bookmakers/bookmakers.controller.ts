import { Controller, Get, Param } from '@nestjs/common';
import { BookmakersService } from './bookmakers.service';
import { Paginate, PaginateQuery } from 'nestjs-paginate';

@Controller('bookmakers')
export class BookmakersController {
  constructor(private readonly bookmakersService: BookmakersService) {}

  @Get()
  findAll(@Paginate() query: PaginateQuery) {
    return this.bookmakersService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.bookmakersService.findOne(id);
  }
}
