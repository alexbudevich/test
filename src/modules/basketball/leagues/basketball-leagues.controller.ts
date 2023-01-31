import { Controller, Get, Param, UseInterceptors } from '@nestjs/common';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { BasketballLeaguesService } from './basketball-leagues.service';
import { NotFoundInterceptor } from '../../../common/interseptor/not-found-interceptor';
import { QueryDTO } from '../../football/matches/dto/query.dto';

@Controller('basketball/leagues')
@ApiTags('Basketball')
export class BasketballLeaguesController {
  constructor(private readonly leaguesService: BasketballLeaguesService) {}

  @Get()
  @ApiQuery({ type: QueryDTO, required: false })
  findAll(@Paginate() query: PaginateQuery) {
    return this.leaguesService.findAll(query);
  }

  @Get('/top-leagues')
  findTopLeagues() {
    return this.leaguesService.findTopLeagues();
  }

  @Get(':country/:league')
  @UseInterceptors(NotFoundInterceptor)
  getBySlug(
    @Param('country') country: string,
    @Param('league') league: string,
  ) {
    return this.leaguesService.getBySlug(country, league);
  }
}
