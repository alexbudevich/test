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
  findByCriteria(@Paginate() query: PaginateQuery) {
    return this.countriesService.findByCriteria(query);
  }

  @Get('/all')
  findAll() {
    return this.countriesService.findAll();
  }

  @Get('/top-countries')
  findTopCountries() {
    return this.countriesService.findTopCountries();
  }

  @Get(':id')
  getById(@Param('id') id: number) {
    return this.countriesService.getById(id);
  }

  @Get('slug/:slug')
  getBySlug(@Param('slug') slug: string) {
    return this.countriesService.getBySlug(slug);
  }
}
