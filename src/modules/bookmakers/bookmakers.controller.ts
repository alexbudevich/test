import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BookmakersService } from './bookmakers.service';
import { CreateBookmakerDto } from './dto/create-bookmaker.dto';
import { UpdateBookmakerDto } from './dto/update-bookmaker.dto';

@Controller('bookmakers')
export class BookmakersController {
  constructor(private readonly bookmakersService: BookmakersService) {}

  @Post()
  create(@Body() createBookmakerDto: CreateBookmakerDto) {
    return this.bookmakersService.create(createBookmakerDto);
  }

  @Get()
  findAll() {
    return this.bookmakersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookmakersService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBookmakerDto: UpdateBookmakerDto,
  ) {
    return this.bookmakersService.update(+id, updateBookmakerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookmakersService.remove(+id);
  }
}
