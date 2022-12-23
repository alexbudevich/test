import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class OddCriteriaDto {
  @IsString()
  @ApiProperty()
  @IsOptional()
  match: string;

  @IsString()
  @ApiProperty()
  @IsOptional()
  bookmaker: string;

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  sport: string;
}
