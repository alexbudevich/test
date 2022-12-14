import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class OddCriteriaDto {
  @IsString()
  @ApiProperty()
  @IsOptional()
  match: string;

  @IsString()
  @ApiProperty()
  @IsOptional()
  bookmaker: string;
}
