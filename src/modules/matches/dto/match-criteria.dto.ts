import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsOptional,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';

enum StatusShortType {
  FT = 'FT',
  NS = 'NS',
}

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

  @IsString()
  @ApiProperty()
  @IsOptional()
  league: string;

  @IsString()
  @ApiProperty()
  @IsOptional()
  country: string;

  @IsBoolean()
  @ApiProperty()
  @IsOptional()
  isLive: boolean;

  @IsBoolean()
  @ApiProperty()
  @IsOptional()
  isTop: boolean;

  @IsEnum(StatusShortType, { each: true })
  @IsOptional()
  @ApiProperty({
    enum: StatusShortType,
    isArray: true,
    example: [StatusShortType.FT, StatusShortType.NS],
  })
  statusShort: StatusShortType[];
}
