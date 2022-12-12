import { Controller, Get, Param } from '@nestjs/common';
import { VenuesService } from './venues.service';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { ApiQuery } from '@nestjs/swagger';

@Controller('venues')
export class VenuesController {
  constructor(private readonly venuesService: VenuesService) {}

  @Get()
  @ApiQuery({ name: 'page', type: Number, required: false })
  @ApiQuery({ name: 'limit', type: Number, required: false })
  findAll(@Paginate() query: PaginateQuery) {
    return this.venuesService.findAll(query);
  }

  @Get(':id')
  getById(@Param('id') id: number) {
    return this.venuesService.getById(id);
  }

  @Get('slug/:slug')
  getBySlug(@Param('slug') slug: string) {
    return this.venuesService.getBySlug(slug);
  }
}
