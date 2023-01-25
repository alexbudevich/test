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
import { MatchCriteriaDto } from './dto/match-criteria.dto';
import { QueryDTO } from '../../../common/dto/query.dto';
import { NotFoundInterceptor } from '../../../common/interseptor/not-found-interceptor';
import { TeamMatchDto } from './dto/team-match.dto';

@Controller('basketball/matches')
@ApiTags('Basketball')
export class BasketballMatchesController {
  constructor(private readonly matchesService: BasketballMatchesService) {}

  @Post('/search')
  @ApiQuery({ type: QueryDTO, required: false })
  findByCriteria(
    @Paginate() query: PaginateQuery,
    @Body() criteria: MatchCriteriaDto,
  ) {
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
