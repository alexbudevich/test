import { Controller, Get, Param } from '@nestjs/common';
import { PlayersService } from './players.service';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { ApiQuery } from '@nestjs/swagger';

@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Get()
  @ApiQuery({ name: 'page', type: Number, required: false })
  @ApiQuery({ name: 'limit', type: Number, required: false })
  findAll(@Paginate() query: PaginateQuery) {
    return this.playersService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.playersService.findOne(id);
  }
}
