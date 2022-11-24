import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class MatchCriteriaDto {
  @ApiProperty()
  @Type(() => Date)
  @IsDate()
  @IsOptional()
  dateFrom?: Date;

  @ApiProperty()
  @Type(() => Date)
  @IsDate()
  @IsOptional()
  dateTo?: Date;
}
