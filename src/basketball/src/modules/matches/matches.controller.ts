import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { MatchesService } from './matches.service';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { ApiQuery } from '@nestjs/swagger';
import { MatchCriteriaDto } from './dto/match-criteria.dto';
import { QueryDTO } from './dto/query.dto';
import { NotFoundInterceptor } from '../../common/interseptor/not-found-interceptor';

@Controller(':sport/matches')
export class MatchesController {
  constructor(private readonly matchesService: MatchesService) {}

  @Post('/search')
  @ApiQuery({ type: QueryDTO, required: false })
  findByCriteria(
    @Paginate() query: PaginateQuery,
    @Body() criteria: MatchCriteriaDto,
  ) {
    return this.matchesService.searchMatchByCriteria(query, criteria);
  }

  @Get(':sport/:match')
  @UseInterceptors(NotFoundInterceptor)
  getBySlug(@Param('sport') sport: string, @Param('match') match: string) {
    return this.matchesService.getBySlug(sport, match);
  }
}
