import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { BookmakersService } from './bookmakers.service';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { BookmakerCriteriaDto } from './dto/bookmaker-criteria.dto';
import { NotFoundInterceptor } from '../../common/interseptor/not-found-interceptor';

@Controller('bookmakers')
@UseInterceptors(NotFoundInterceptor)
@ApiTags('Common')
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
