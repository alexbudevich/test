import { Controller, Get, Param, UseInterceptors } from '@nestjs/common';
import { BasketballTeamsService } from './basketball-teams.service';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { NotFoundInterceptor } from '../../../common/interseptor/not-found-interceptor';

@Controller('basketball/teams')
@ApiTags('Basketball')
export class BasketballTeamsController {
  constructor(private readonly teamsService: BasketballTeamsService) {}

  @Get()
  @ApiQuery({ name: 'page', type: Number, required: false })
  @ApiQuery({ name: 'limit', type: Number, required: false })
  findAll(@Paginate() query: PaginateQuery) {
    return this.teamsService.findAll(query);
  }

  @Get(':slug')
  @UseInterceptors(NotFoundInterceptor)
  getBySlug(@Param('slug') slug: string) {
    return this.teamsService.getBySlug(slug);
  }
}
