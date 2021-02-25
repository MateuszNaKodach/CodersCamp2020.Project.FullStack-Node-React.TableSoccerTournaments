import {ModuleCore} from "../../../shared/core/ModuleCore";
import {FindAllPlayerProfiles} from "./application/query/FindAllPlayerProfiles";
import {FindAllPlayerProfilesQueryHandler} from "./application/query/FindAllPlayerProfilesQueryHandler";
import {PlayerProfilesRepository} from "./application/PlayerProfilesRepository";
import {PlayerProfile} from "./application/command/PlayerProfile";
import {PlayerProfileCommandHandler} from "./application/command/PlayerProfileCommandHandler";
import {DomainEventPublisher} from "../../../shared/core/application/event/DomainEventBus";
import {CurrentTimeProvider} from "../../../shared/core/CurrentTimeProvider";

export function PlayerProfilesModuleCore(
    eventPublisher: DomainEventPublisher,
    currentTimeProvider: CurrentTimeProvider,
    playerProfileRepository: PlayerProfilesRepository
): ModuleCore {
    return {
        commandHandlers: [
            {
                commandType: PlayerProfile,
                handler: new PlayerProfileCommandHandler(eventPublisher, currentTimeProvider, playerProfileRepository)
            }
        ],
        eventHandlers: [],
        queryHandlers: [
            {
                queryType: FindAllPlayerProfiles,
                handler: new FindAllPlayerProfilesQueryHandler(playerProfileRepository)
            }
        ]
    }
}