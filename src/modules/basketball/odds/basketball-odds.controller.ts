import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { BasketballOddsService } from './basketball-odds.service';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { OddCriteriaDto } from './dto/odd-criteria.dto';

@Controller('basketball/odds')
@ApiTags('Basketball')
export class BasketballOddsController {
  constructor(private readonly oddsService: BasketballOddsService) {}

  @Post('/search')
  @ApiQuery({ name: 'page', type: Number, required: false })
  @ApiQuery({ name: 'limit', type: Number, required: false })
  findByCriteria(
    @Paginate() query: PaginateQuery,
    @Body() criteria: OddCriteriaDto,
  ) {
    return this.oddsService.searchOddByCriteria(query, criteria);
  }

  @Get(':match')
  @ApiQuery({ name: 'page', type: Number, required: false })
  @ApiQuery({ name: 'limit', type: Number, required: false })
  getMatchOdds(
    @Paginate() query: PaginateQuery,
    @Param('match') match: string,
  ) {
    return this.oddsService.getMatchOdds(query, match);
  }

  @Get(':match/top')
  getTopMatchOdds(@Param('match') match: string) {
    return this.oddsService.getTopMatchOdds(match);
  }
}
