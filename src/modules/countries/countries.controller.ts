import { Controller, Get, Param } from '@nestjs/common';
import { CountriesService } from './countries.service';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { ApiQuery } from '@nestjs/swagger';

@Controller('countries')
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @Get()
  @ApiQuery({ name: 'page', type: Number, required: false })
  @ApiQuery({ name: 'limit', type: Number, required: false })
  findAll(@Paginate() query: PaginateQuery) {
    return this.countriesService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.countriesService.findOne(id);
  }
}
