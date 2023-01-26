import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { BasketballMatchesService } from './basketball-matches.service';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { MatchCriteriaDto } from '../../../common/dto/match-criteria.dto';
import { QueryDTO } from '../../../common/dto/query.dto';
import { NotFoundInterceptor } from '../../../common/interseptor/not-found-interceptor';
import { TeamMatchDto } from './dto/team-match.dto';

@Controller('basketball/matches')
@ApiTags('Basketball')
export class BasketballMatchesController {
  constructor(private readonly matchesService: BasketballMatchesService) {}

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

  @Post('team/:team')
  @UseInterceptors(NotFoundInterceptor)
  @ApiQuery({ type: QueryDTO, required: false })
  getLastMatchesBySlug(
    @Param('team') match: string,
    @Paginate() query: PaginateQuery,
    @Body() criteria: TeamMatchDto,
  ) {
    return this.matchesService.getMatchesByTeam(match, query, criteria);
  }
}
