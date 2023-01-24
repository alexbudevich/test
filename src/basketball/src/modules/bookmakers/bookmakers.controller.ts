import { Controller, Get, Param, UseInterceptors } from '@nestjs/common';
import { BookmakersService } from './bookmakers.service';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { ApiQuery } from '@nestjs/swagger';
import { NotFoundInterceptor } from '../../common/interseptor/not-found-interceptor';

@Controller('basketball/bookmakers')
@UseInterceptors(NotFoundInterceptor)
export class BookmakersController {
  constructor(private readonly bookmakersService: BookmakersService) {}

  @Get()
  @ApiQuery({ name: 'page', type: Number, required: false })
  @ApiQuery({ name: 'limit', type: Number, required: false })
  findByCriteria(@Paginate() query: PaginateQuery) {
    return this.bookmakersService.findAll(query);
  }

  @Get(':slug')
  getBySlug(@Param('slug') slug: string) {
    return this.bookmakersService.getBySlug(slug);
  }
}
