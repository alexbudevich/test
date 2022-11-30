import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsNumber,
  IsOptional,
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

  @IsNumber()
  @ApiProperty()
  @IsOptional()
  leagueId: number;

  @IsNumber()
  @ApiProperty()
  @IsOptional()
  countryId: number;

  @IsBoolean()
  @ApiProperty()
  @IsOptional()
  isLive: boolean;

  @IsEnum(StatusShortType, { each: true })
  @IsOptional()
  @ApiProperty({
    enum: StatusShortType,
    isArray: true,
    example: [StatusShortType.FT, StatusShortType.NS],
  })
  statusShort: StatusShortType[];
}
