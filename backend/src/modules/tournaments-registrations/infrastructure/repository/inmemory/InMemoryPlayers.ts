import { AvailablePlayersForTournament } from '../../../core/application/command/AvailablePlayersForTournament';
import { Player, Players } from '../../../core/application/command/Players';
import { PlayerId } from '../../../core/domain/PlayerId';

export class InMemoryPlayers implements AvailablePlayersForTournament, Players {
  private readonly entities: { [id: string]: Player } = {};

  async save(player: Player): Promise<void> {
    this.entities[player.playerId.raw] = player;
  }

  canPlay(playerId: PlayerId): Promise<boolean> {
    return Promise.resolve(this.entities[playerId.raw] !== undefined);
  }
}
