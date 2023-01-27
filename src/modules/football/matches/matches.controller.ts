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
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { QueryDTO } from './dto/query.dto';
import { NotFoundInterceptor } from '../../../common/interseptor/not-found-interceptor';
import { MatchCriteriaDto } from '../../../common/dto/match-criteria.dto';

@Controller('football/matches')
@ApiTags('Football')
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

  @Post(':country/search')
  @ApiQuery({ type: QueryDTO, required: false })
  findByCriteriaWithCountry(
    @Param('country') country: string,
    @Paginate() query: PaginateQuery,
    @Body() criteria: MatchCriteriaDto,
  ) {
    criteria.country = country;
    return this.matchesService.searchMatchByCriteria(query, criteria);
  }

  @Post(':country/:league/search')
  @ApiQuery({ type: QueryDTO, required: false })
  findByCriteriaWithCountryAndLeague(
    @Param('country') country: string,
    @Param('league') league: string,
    @Paginate() query: PaginateQuery,
    @Body() criteria: MatchCriteriaDto,
  ) {
    criteria.country = country;
    criteria.league = league;
    return this.matchesService.searchMatchByCriteria(query, criteria);
  }

  @Get(':match')
  @UseInterceptors(NotFoundInterceptor)
  getBySlug(@Param('match') match: string) {
    return this.matchesService.getBySlug(match);
  }
}
