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
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { QueryDTO } from './dto/query.dto';
import { NotFoundInterceptor } from '../../../common/interseptor/not-found-interceptor';
import { MatchCriteriaDto } from '../../../common/dto/match-criteria.dto';
import {TeamMatchDto} from "../../basketball/matches/dto/team-match.dto";

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

  @Post(':match/date')
  @UseInterceptors(NotFoundInterceptor)
  @ApiQuery({ type: QueryDTO, required: false })
  getMatchesBySlugAndDate(
    @Param('match') match: string,
    @Paginate() query: PaginateQuery,
    @Body() criteria: TeamMatchDto,
  ) {
    return this.matchesService.getMatchesBySlugAndDate(match, query, criteria);
  }

  @Post('team/:team')
  @UseInterceptors(NotFoundInterceptor)
  @ApiQuery({ type: QueryDTO, required: false })
  getLastMatchesByTeam(
    @Param('team') match: string,
    @Paginate() query: PaginateQuery,
    @Body() criteria: TeamMatchDto,
  ) {
    return this.matchesService.getMatchesByTeam(match, query, criteria);
  }
}
