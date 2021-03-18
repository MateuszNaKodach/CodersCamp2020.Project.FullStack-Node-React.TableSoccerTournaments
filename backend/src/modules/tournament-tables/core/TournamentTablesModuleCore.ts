import { DomainEventPublisher } from '../../../shared/core/application/event/DomainEventBus';
import { CommandPublisher } from '../../../shared/core/application/command/CommandBus';
import { CurrentTimeProvider } from '../../../shared/core/CurrentTimeProvider';
import { ModuleCore } from '../../../shared/core/ModuleCore';
import { TournamentTablesRepository } from './application/TournamentTablesRepository';
import { AssignTablesToTournament } from './application/command/AssignTablesToTournament';
import { AssignTablesToTournamentCommandHandler } from './application/command/AssignTablesToTournamentCommandHandler';
import { FindTablesByTournamentId } from './application/query/FindTablesByTournamentId';
import { FindTablesByTournamentIdQueryHandler } from './application/query/FindTablesByTournamentIdQueryHandler';
import { BookTournamentTable } from './application/command/BookTournamentTable';
import { BookTournamentTableCommandHandler } from './application/command/BookTournamentTableCommandHandler';
import { ReleaseTournamentTable } from './application/command/ReleaseTournamentTable';
import { ReleaseTournamentTableCommandHandler } from './application/command/ReleaseTournamentTableCommandHandler';

export function TournamentTablesModuleCore(
  eventPublisher: DomainEventPublisher,
  commandPublisher: CommandPublisher,
  currentTimeProvider: CurrentTimeProvider,
  repository: TournamentTablesRepository,
): ModuleCore {
  return {
    commandHandlers: [
      {
        commandType: AssignTablesToTournament,
        handler: new AssignTablesToTournamentCommandHandler(eventPublisher, currentTimeProvider, repository),
      },
      {
        commandType: BookTournamentTable,
        handler: new BookTournamentTableCommandHandler(eventPublisher, currentTimeProvider, repository),
      },
      {
        commandType: ReleaseTournamentTable,
        handler: new ReleaseTournamentTableCommandHandler(eventPublisher, currentTimeProvider, repository),
      },
    ],
    eventHandlers: [],
    queryHandlers: [
      {
        queryType: FindTablesByTournamentId,
        handler: new FindTablesByTournamentIdQueryHandler(repository),
      },
    ],
  };
}
