import { ApiProperty } from '@nestjs/swagger';

export class OddCriteriaDto {
  @ApiProperty()
  matchId: number;
}