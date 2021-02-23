import { PlayerId } from '../../domain/PlayerId';

export interface AvailablePlayersForTournament {
  canPlay(playerId: PlayerId): Promise<boolean>;
}
