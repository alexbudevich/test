import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TimeZonesService } from './time-zones.service';
import { CreateTimeZoneDto } from './dto/create-time-zone.dto';
import { UpdateTimeZoneDto } from './dto/update-time-zone.dto';

@Controller('time-zones')
export class TimeZonesController {
  constructor(private readonly timeZonesService: TimeZonesService) {}

  @Post()
  create(@Body() createTimeZoneDto: CreateTimeZoneDto) {
    return this.timeZonesService.create(createTimeZoneDto);
  }

  @Get()
  findAll() {
    return this.timeZonesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.timeZonesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTimeZoneDto: UpdateTimeZoneDto,
  ) {
    return this.timeZonesService.update(+id, updateTimeZoneDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.timeZonesService.remove(+id);
  }
}
