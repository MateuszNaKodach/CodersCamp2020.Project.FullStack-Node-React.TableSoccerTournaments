import { PlayerId } from '../../../../../shared/core/domain/PlayerId';

export interface AvailablePlayersForTournament {
  canPlay(playerId: PlayerId): Promise<boolean>;
}
