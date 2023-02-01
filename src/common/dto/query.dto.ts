import { IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum OrderType {
  DESC = 'DESC',
  ASC = 'ASC',
}

export class QueryDTO {
  @IsOptional()
  @ApiProperty({ required: false, example: 'date:DESC' })
  sortBy?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  page?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  limit?: number;
}
