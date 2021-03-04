import { DomainEventPublisher } from '../../../shared/core/application/event/DomainEventBus';
import { CommandPublisher } from '../../../shared/core/application/command/CommandBus';
import { CurrentTimeProvider } from '../../../shared/core/CurrentTimeProvider';
import { ModuleCore } from '../../../shared/core/ModuleCore';
import { EntityIdGenerator } from '../../../shared/core/application/EntityIdGenerator';

export function DoublesTournamentModuleCore(
    eventPublisher: DomainEventPublisher,
    commandPublisher: CommandPublisher,
    currentTimeProvider: CurrentTimeProvider,
    entityIdGenerator: EntityIdGenerator,
    repository: TournamentTablesRepository,
): ModuleCore {
    return {
        commandHandlers: [],
        eventHandlers: [],
        queryHandlers: [],
    };
}
