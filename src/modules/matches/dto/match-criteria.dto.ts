import { ApiProperty } from '@nestjs/swagger';
import { IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class MatchCriteriaDto {
  @ApiProperty()
  @Type(() => Date)
  @IsDate()
  dateFrom: Date;

  @ApiProperty()
  @Type(() => Date)
  @IsDate()
  dateTo: Date;
}
