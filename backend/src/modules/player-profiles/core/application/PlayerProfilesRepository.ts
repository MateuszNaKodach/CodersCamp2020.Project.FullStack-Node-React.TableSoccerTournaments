import {PlayerProfile} from "../domain/PlayerProfile";

export interface PlayerProfilesRepository {
    save(playerProfile: PlayerProfile): Promise<void>;

    findByPlayerId(playerId: string): Promise<PlayerProfile | undefined>;

    findAll(): Promise<PlayerProfile[]>;
}