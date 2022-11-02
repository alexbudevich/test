import { Controller, Get, Param } from '@nestjs/common';
import { CountriesService } from './countries.service';
import { Paginate, PaginateQuery } from 'nestjs-paginate';

@Controller('countries')
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @Get()
  findAll(@Paginate() query: PaginateQuery) {
    return this.countriesService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.countriesService.findOne(id);
  }
}
