import { PlayerProfilesRepository } from '../../../../player-profiles/core/application/PlayerProfilesRepository';
import { PlayerProfile } from '../../../../player-profiles/core/domain/PlayerProfile';

export class InMemoryPlayerProfileRepository implements PlayerProfilesRepository {
  private readonly entities: { [id: string]: PlayerProfile } = {};

  findByPlayerId(playerId: string): Promise<PlayerProfile | undefined> {
    return Promise.resolve(this.entities[playerId]);
  }

  async save(playerProfile: PlayerProfile): Promise<void> {
    this.entities[playerProfile.playerId] = playerProfile;
  }

  findAll(): Promise<PlayerProfile[]> {
    return Promise.resolve(Object.keys(this.entities).map((id) => this.entities[id]));
  }
}
