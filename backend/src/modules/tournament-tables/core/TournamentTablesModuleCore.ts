import { DomainEventPublisher } from '../../../shared/core/application/event/DomainEventBus';
import { CommandPublisher } from '../../../shared/core/application/command/CommandBus';
import { CurrentTimeProvider } from '../../../shared/core/CurrentTimeProvider';
import { ModuleCore } from '../../../shared/core/ModuleCore';
import { TournamentTablesRepository } from './application/TournamentTablesRepository';
import { AssignTournamentTables } from './application/command/AssignTournamentTables';
import { AssignTournamentTablesCommandHandler } from './application/command/AssignTournamentTablesCommandHandler';

export function TournamentTablesModuleCore(
  eventPublisher: DomainEventPublisher,
  commandPublisher: CommandPublisher,
  currentTimeProvider: CurrentTimeProvider,
  repository: TournamentTablesRepository,
): ModuleCore {
  return {
    commandHandlers: [
      {
        commandType: AssignTournamentTables,
        handler: new AssignTournamentTablesCommandHandler(eventPublisher, currentTimeProvider, repository),
      },
    ],
    eventHandlers: [],
    queryHandlers: [],
  };
}
