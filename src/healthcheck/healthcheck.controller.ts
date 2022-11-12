import {Controller, Get} from '@nestjs/common';
import {Paginate, PaginateQuery} from 'nestjs-paginate';

@Controller('healthcheck')
export class HealthcheckController {
  @Get()
  findAll(@Paginate() query: PaginateQuery) {
    return 'OK';
  }
}
