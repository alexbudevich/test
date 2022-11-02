import { Controller, Get, Param } from '@nestjs/common';
import { PlayersService } from './players.service';
import { Paginate, PaginateQuery } from 'nestjs-paginate';

@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Get()
  findAll(@Paginate() query: PaginateQuery) {
    return this.playersService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.playersService.findOne(id);
  }

}
