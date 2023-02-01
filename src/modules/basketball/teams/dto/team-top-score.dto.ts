import { Player } from '../../../football/players/entities/player.entity';

export class TeamTopScore {
  player: Player;
  totalMatches: number;
  goalsTotal: number;
  goalsAssists: number;
}
