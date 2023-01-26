import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { OddsService } from './odds.service';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { OddCriteriaDto } from './dto/odd-criteria.dto';
import { NotFoundInterceptor } from '../../../common/interseptor/not-found-interceptor';

@Controller('football/odds')
@ApiTags('Football')
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

  @Get('/:match')
  @ApiQuery({ name: 'page', type: Number, required: false })
  @ApiQuery({ name: 'limit', type: Number, required: false })
  getMatchOdds(
    @Paginate() query: PaginateQuery,
    @Param('match') match: string,
  ) {
    return this.oddsService.getMatchOdds(query, match);
  }

  @Get(':match/top')
  getTopMatchOdds(
    @Param('match') match: string,
  ) {
    return this.oddsService.getTopMatchOdds(match);
  }

  @Get(':id')
  @ApiOperation({ deprecated: true })
  @UseInterceptors(NotFoundInterceptor)
  betById(@Param('id') id: number) {
    return this.oddsService.betById(id);
  }
}
