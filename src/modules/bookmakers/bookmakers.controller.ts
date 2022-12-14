import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { BookmakersService } from './bookmakers.service';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { ApiQuery } from '@nestjs/swagger';
import { BookmakerCriteriaDto } from './dto/bookmaker-criteria.dto';

@Controller('bookmakers')
export class BookmakersController {
  constructor(private readonly bookmakersService: BookmakersService) {}

  @Post('/search')
  @ApiQuery({ name: 'page', type: Number, required: false })
  @ApiQuery({ name: 'limit', type: Number, required: false })
  findByCriteria(
    @Paginate() query: PaginateQuery,
    @Body() criteria: BookmakerCriteriaDto,
  ) {
    return this.bookmakersService.searchBookmakerByCriteria(query, criteria);
  }

  @Get(':id')
  getById(@Param('id') id: number) {
    return this.bookmakersService.getById(id);
  }

  @Get('slug/:slug')
  getBySlug(@Param('slug') slug: string) {
    return this.bookmakersService.getBySlug(slug);
  }
}
