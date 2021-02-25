import {PlayerProfile} from "./command/PlayerProfile";

export interface PlayerProfilesRepository {
    findAll(): Promise<PlayerProfile[]>;
}