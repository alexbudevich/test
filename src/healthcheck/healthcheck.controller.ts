import { Controller, Get } from '@nestjs/common';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { ApiExcludeController } from '@nestjs/swagger';

@Controller('healthcheck')
@ApiExcludeController()
export class HealthcheckController {
  @Get()
  findAll(@Paginate() query: PaginateQuery) {
    return 'OK';
  }
}
