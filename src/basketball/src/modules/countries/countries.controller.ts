import { Controller, Get, Param, UseInterceptors } from '@nestjs/common';
import { CountriesService } from './countries.service';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { ApiQuery } from '@nestjs/swagger';
import { NotFoundInterceptor } from '../../common/interseptor/not-found-interceptor';

@Controller('basketball/countries')
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @Get()
  @ApiQuery({ name: 'page', type: Number, required: false })
  @ApiQuery({ name: 'limit', type: Number, required: false })
  findByCriteria(@Paginate() query: PaginateQuery) {
    return this.countriesService.paginatedCountries(query);
  }

  @Get('/all')
  findAll() {
    return this.countriesService.findAll();
  }

  @Get('/top-countries')
  findTopCountries() {
    return this.countriesService.findTopCountries();
  }

  @Get('slug/:slug')
  @UseInterceptors(NotFoundInterceptor)
  getBySlug(@Param('slug') slug: string) {
    return this.countriesService.getBySlug(slug);
  }
}
