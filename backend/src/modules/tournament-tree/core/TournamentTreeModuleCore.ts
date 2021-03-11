import {ModuleCore} from "../../../shared/core/ModuleCore";
import {CreateTournamentTree} from "./application/command/CreateTournamentTree";
import {CreateTournamentTreeCommandHandler} from "./application/command/CreateTournamentTreeCommandHandler";
import {TournamentTreeRepository} from "./application/TournamentTreeRepository";
import {EntityIdGenerator} from "../../../shared/core/application/EntityIdGenerator";
import {CurrentTimeProvider} from "../../../shared/core/CurrentTimeProvider";
import {DomainEventPublisher} from "../../../shared/core/application/event/DomainEventBus";
import {CommandPublisher} from "../../../shared/core/application/command/CommandBus";
import {TournamentWithTeamsWasCreated} from "../../doubles-tournament/core/domain/event/TournamentWithTeamsWasCreated";
import {CreateTournamentTreeWhenTournamentWithTeamsWasCreated} from "./application/event/CreateTournamentTreeWhenTournamentWithTeamsWasCreated";

export function TournamentTreeModuleCore(
    eventPublisher: DomainEventPublisher,
    commandPublisher: CommandPublisher,
    currentTimeProvider: CurrentTimeProvider,
    entityIdGenerator: EntityIdGenerator,
    repository: TournamentTreeRepository,
): ModuleCore {

    return {
        commandHandlers: [{
            commandType: CreateTournamentTree,
            handler: new CreateTournamentTreeCommandHandler(
                eventPublisher,
                currentTimeProvider,
                entityIdGenerator,
                repository
            )
        }],
        eventHandlers: [{
            eventType: TournamentWithTeamsWasCreated, // Ten typ eventu łapie :)))
            handler: new CreateTournamentTreeWhenTournamentWithTeamsWasCreated(commandPublisher),
        }],

        queryHandlers: [],
    };

}

