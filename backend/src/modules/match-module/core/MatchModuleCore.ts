import {DomainEventPublisher} from "../../../shared/core/application/event/DomainEventBus";
import {CommandPublisher} from "../../../shared/core/application/command/CommandBus";
import {CurrentTimeProvider} from "../../../shared/core/CurrentTimeProvider";
import {ModuleCore} from "../../../shared/core/ModuleCore";
import {StartMatch} from "./application/command/StartMatch";
import {StartMatchCommandHandler} from "./application/command/StartMatchCommandHandler";

export function MatchModuleCore(
    eventPublisher: DomainEventPublisher,
    commandPublisher: CommandPublisher,
    currentTimeProvider: CurrentTimeProvider,
): ModuleCore {
    return {
        commandHandlers: [
            {
                commandType: StartMatch,
                handler: new StartMatchCommandHandler(eventPublisher, currentTimeProvider),
            }
        ],
        eventHandlers: [],
        queryHandlers: [],
    };
}