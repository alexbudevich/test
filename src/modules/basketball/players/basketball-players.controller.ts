import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { BasketballPlayersService } from './basketball-players.service';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { PlayerCriteriaDto } from './dto/player-criteria.dto';
import { NotFoundInterceptor } from '../../../common/interseptor/not-found-interceptor';

@Controller('basketball/players')
@ApiTags('Basketball')
export class BasketballPlayersController {
  constructor(private readonly playersService: BasketballPlayersService) {}

  @Post('/search')
  @ApiQuery({ name: 'page', type: Number, required: false })
  @ApiQuery({ name: 'limit', type: Number, required: false })
  findByCriteria(
    @Paginate() query: PaginateQuery,
    @Body() criteria: PlayerCriteriaDto,
  ) {
    return this.playersService.searchPlayerByCriteria(query, criteria);
  }

  @Get(':slug')
  @UseInterceptors(NotFoundInterceptor)
  getBySlug(@Param('slug') slug: string) {
    return this.playersService.getBySlug(slug);
  }
}
