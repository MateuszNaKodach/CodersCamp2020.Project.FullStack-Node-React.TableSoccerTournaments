import { PlayerProfile } from '../domain/PlayerProfile';
import { PlayerId } from '../../../../shared/core/domain/PlayerId';

export interface PlayerProfilesRepository {
  save(playerProfile: PlayerProfile): Promise<void>;

  findByPlayerId(playerId: PlayerId): Promise<PlayerProfile | undefined>;

  findAll(): Promise<PlayerProfile[]>;
}
