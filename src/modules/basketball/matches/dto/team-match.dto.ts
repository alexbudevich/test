import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';

export class TeamMatchDto {
  @ApiProperty()
  @Type(() => Date)
  @IsDate()
  @IsOptional()
  latestThen?: Date;

  @ApiProperty()
  @Type(() => Date)
  @IsDate()
  @IsOptional()
  greatestThen?: Date;
}
