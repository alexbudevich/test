import { ApiProperty } from '@nestjs/swagger';

export class PlayerCriteriaDto {
  @ApiProperty()
  matchId: string;
}
