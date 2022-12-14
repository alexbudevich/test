import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { OddsService } from './odds.service';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { ApiQuery } from '@nestjs/swagger';
import { OddCriteriaDto } from './dto/odd-criteria.dto';

@Controller('odds')
export class OddsController {
  constructor(private readonly oddsService: OddsService) {}

  @Post('/search')
  @ApiQuery({ name: 'page', type: Number, required: false })
  @ApiQuery({ name: 'limit', type: Number, required: false })
  findByCriteria(
    @Paginate() query: PaginateQuery,
    @Body() criteria: OddCriteriaDto,
  ) {
    return this.oddsService.searchOddByCriteria(query, criteria);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.oddsService.findOne(id);
  }
}
