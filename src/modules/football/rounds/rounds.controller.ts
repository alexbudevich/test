import { Controller, Get, Param, UseInterceptors } from '@nestjs/common';
import { RoundsService } from './rounds.service';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import {ApiQuery, ApiTags} from '@nestjs/swagger';
import { NotFoundInterceptor } from '../../../common/interseptor/not-found-interceptor';

@Controller('rounds')
@ApiTags('Football')
export class RoundsController {
  constructor(private readonly roundsService: RoundsService) {}

  @Get()
  @ApiQuery({ name: 'page', type: Number, required: false })
  @ApiQuery({ name: 'limit', type: Number, required: false })
  findAll(@Paginate() query: PaginateQuery) {
    return this.roundsService.findAll(query);
  }

  @Get(':id')
  @UseInterceptors(NotFoundInterceptor)
  getById(@Param('id') id: number) {
    return this.roundsService.getById(id);
  }

  @Get('slug/:slug')
  @UseInterceptors(NotFoundInterceptor)
  getBySlug(@Param('slug') slug: string) {
    return this.roundsService.getBySlug(slug);
  }
}
