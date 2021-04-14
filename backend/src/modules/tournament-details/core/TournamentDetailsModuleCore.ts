import { DomainEventPublisher } from '../../../shared/core/application/event/DomainEventBus';
import { CommandPublisher } from '../../../shared/core/application/command/CommandBus';
import { CurrentTimeProvider } from '../../../shared/core/CurrentTimeProvider';
import { ModuleCore } from '../../../shared/core/ModuleCore';
import { TournamentDetailsRepository } from './application/TournamentDetailsRepository';
import { AddTournamentDetails } from './application/command/AddTournamentDetails';
import { AddTournamentsDetailsCommandHandler } from './application/command/AddTournamentsDetailsCommandHandler';
import { FindAllTournamentDetails } from './application/query/FindAllTournamentDetails';
import { FindAllTournamentDetailsQueryHandler } from './application/query/FindAllTournamentDetailsQueryHandler';

export function TournamentDetailsModuleCore(
  eventPublisher: DomainEventPublisher,
  commandPublisher: CommandPublisher,
  currentTimeProvider: CurrentTimeProvider,
  tournamentDetailsRepository: TournamentDetailsRepository,
): ModuleCore {
  return {
    commandHandlers: [
      {
        commandType: AddTournamentDetails,
        handler: new AddTournamentsDetailsCommandHandler(tournamentDetailsRepository),
      },
    ],
    eventHandlers: [],
    queryHandlers: [
      {
        queryType: FindAllTournamentDetails,
        handler: new FindAllTournamentDetailsQueryHandler(tournamentDetailsRepository),
      },
    ],
  };
}
