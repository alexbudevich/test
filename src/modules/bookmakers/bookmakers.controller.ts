import { Controller, Get, Param } from '@nestjs/common';
import { BookmakersService } from './bookmakers.service';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { ApiQuery } from '@nestjs/swagger';

@Controller('bookmakers')
export class BookmakersController {
  constructor(private readonly bookmakersService: BookmakersService) {}

  @Get()
  @ApiQuery({ name: 'page', type: Number, required: false })
  @ApiQuery({ name: 'limit', type: Number, required: false })
  findAll(@Paginate() query: PaginateQuery) {
    return this.bookmakersService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.bookmakersService.findOne(id);
  }
}
