import {DomainEventPublisher} from "../../../shared/core/application/event/DomainEventBus";
import {CommandPublisher} from "../../../shared/core/application/command/CommandBus";
import {CurrentTimeProvider} from "../../../shared/core/CurrentTimeProvider";
import {ModuleCore} from "../../../shared/core/ModuleCore";

export function MatchModuleCore(
    eventPublisher: DomainEventPublisher,
    commandPublisher: CommandPublisher,
    currentTimeProvider: CurrentTimeProvider,
): ModuleCore {
    return {
        commandHandlers: [],
        eventHandlers: [],
        queryHandlers: [],
    };
}