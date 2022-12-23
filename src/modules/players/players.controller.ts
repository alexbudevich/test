import { Body, Controller, Get, Param, Post, UseInterceptors } from '@nestjs/common';
import { PlayersService } from './players.service';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { ApiQuery } from '@nestjs/swagger';
import { PlayerCriteriaDto } from './dto/player-criteria.dto';
import { NotFoundInterceptor } from '../../common/interseptor/not-found-interceptor';

@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Post('/search')
  @ApiQuery({ name: 'page', type: Number, required: false })
  @ApiQuery({ name: 'limit', type: Number, required: false })
  findByCriteria(
    @Paginate() query: PaginateQuery,
    @Body() criteria: PlayerCriteriaDto,
  ) {
    return this.playersService.searchPlayerByCriteria(query, criteria);
  }

  @Get(':id')
  @UseInterceptors(NotFoundInterceptor)
  getById(@Param('id') id: number) {
    return this.playersService.getById(id);
  }

  @Get('slug/:slug')
  @UseInterceptors(NotFoundInterceptor)
  getBySlug(@Param('slug') slug: string) {
    return this.playersService.getBySlug(slug);
  }
}
