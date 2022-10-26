import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OddsService } from './odds.service';
import { CreateOddDto } from './dto/create-odd.dto';
import { UpdateOddDto } from './dto/update-odd.dto';

@Controller('odds')
export class OddsController {
  constructor(private readonly oddsService: OddsService) {}

  @Post()
  create(@Body() createOddDto: CreateOddDto) {
    return this.oddsService.create(createOddDto);
  }

  @Get()
  findAll() {
    return this.oddsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.oddsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOddDto: UpdateOddDto) {
    return this.oddsService.update(+id, updateOddDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.oddsService.remove(+id);
  }
}
