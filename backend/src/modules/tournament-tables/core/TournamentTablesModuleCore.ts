import { DomainEventPublisher } from '../../../shared/core/application/event/DomainEventBus';
import { CommandPublisher } from '../../../shared/core/application/command/CommandBus';
import { CurrentTimeProvider } from '../../../shared/core/CurrentTimeProvider';
import { ModuleCore } from '../../../shared/core/ModuleCore';
import { EntityIdGenerator } from '../../../shared/core/application/EntityIdGenerator';
import { TournamentTablesRepository } from "./application/TournamentTablesRepository";
import {AddTournamentTables} from "./application/command/AddTournamentTables";
import {AddTournamentTablesCommandHandler} from "./application/command/AddTournamentTablesCommandHandler";

export function TournamentTablesModuleCore(
    eventPublisher: DomainEventPublisher,
    commandPublisher: CommandPublisher,
    currentTimeProvider: CurrentTimeProvider,
    entityIdGenerator: EntityIdGenerator,
    repository: TournamentTablesRepository,
): ModuleCore {
    return {
        commandHandlers: [
            {
                commandType: AddTournamentTables,
                handler: new AddTournamentTablesCommandHandler(eventPublisher, currentTimeProvider, entityIdGenerator, repository),
            },
        ],
        eventHandlers: [],
        queryHandlers: [],
    };
}
