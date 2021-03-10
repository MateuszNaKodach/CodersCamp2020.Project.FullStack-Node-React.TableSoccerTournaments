import {ModuleCore} from "../../../shared/core/ModuleCore";

export function TournamentModuleCore(
    // eventPublisher: DomainEventPublisher,
    // commandPublisher: CommandPublisher,
    // currentTimeProvider: CurrentTimeProvider,
    // entityIdGenerator: EntityIdGenerator,
    // repository: DoublesTournamentRepository,
): ModuleCore {

    return {
        commandHandlers: [],
        eventHandlers: [],
        queryHandlers: [],
    };
}

