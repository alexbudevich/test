import { Controller, Get, Param, UseInterceptors } from '@nestjs/common';
import { VenuesService } from './venues.service';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { ApiQuery } from '@nestjs/swagger';
import { NotFoundInterceptor } from '../../common/interseptor/not-found-interceptor';

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
  @UseInterceptors(NotFoundInterceptor)
  getById(@Param('id') id: number) {
    return this.venuesService.getById(id);
  }

  @Get('slug/:slug')
  @UseInterceptors(NotFoundInterceptor)
  getBySlug(@Param('slug') slug: string) {
    return this.venuesService.getBySlug(slug);
  }
}
