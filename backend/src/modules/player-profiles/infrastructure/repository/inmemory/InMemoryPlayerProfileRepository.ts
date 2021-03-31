import { PlayerProfilesRepository } from '../../../core/application/PlayerProfilesRepository';
import { PlayerProfile } from '../../../core/domain/PlayerProfile';
import { PlayerId } from '../../../../../shared/core/domain/PlayerId';

export class InMemoryPlayerProfileRepository implements PlayerProfilesRepository {
  private readonly entities: { [id: string]: PlayerProfile } = {};

  findByPlayerId(playerId: PlayerId): Promise<PlayerProfile | undefined> {
    return Promise.resolve(this.entities[playerId.raw]);
  }

  async save(playerProfile: PlayerProfile): Promise<void> {
    if (Object.values(this.entities).some((player) => player.emailAddress === playerProfile.emailAddress)) {
      throw new Error('Podany e-mail już istnieje.');
    } else {
      this.entities[playerProfile.playerId.raw] = playerProfile;
    }
  }

  findAll(): Promise<PlayerProfile[]> {
    return Promise.resolve(Object.keys(this.entities).map((id) => this.entities[id]));
  }
}
