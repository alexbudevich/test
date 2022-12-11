import { Controller, Get, Param } from '@nestjs/common';
import { RoundsService } from './rounds.service';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { ApiQuery } from '@nestjs/swagger';

@Controller('rounds')
export class RoundsController {
  constructor(private readonly roundsService: RoundsService) {}

  @Get()
  @ApiQuery({ name: 'page', type: Number, required: false })
  @ApiQuery({ name: 'limit', type: Number, required: false })
  findAll(@Paginate() query: PaginateQuery) {
    return this.roundsService.findAll(query);
  }

  @Get(':id')
  getById(@Param('id') id: number) {
    return this.roundsService.getById(id);
  }

  @Get('slug/:slug')
  getBySlug(@Param('slug') slug: string) {
    return this.roundsService.getBySlug(slug);
  }
}
