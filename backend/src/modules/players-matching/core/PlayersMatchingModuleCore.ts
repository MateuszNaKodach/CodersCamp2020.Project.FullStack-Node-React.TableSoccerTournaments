import { ModuleCore } from '../../../shared/core/ModuleCore';
import { CurrentTimeProvider } from '../../../shared/core/CurrentTimeProvider';
import { DomainEventPublisher } from '../../../shared/core/application/event/DomainEventBus';
import { MatchPlayersToTeams } from './application/MatchPlayersToTeams';
import { MatchPlayersToTeamsCommandHandler } from './application/MatchPlayersToTeamsCommandHandler';
import { TournamentRegistrationsWereClosed } from '../../tournaments-registrations/core/domain/event/TournamentRegistrationsWereClosed';
import { MatchPlayersWhenTournamentRegistrationsWereClosed } from './application/MatchPlayersWhenTournamentRegistrationsWereClosed';
import { CommandPublisher } from '../../../shared/core/application/command/CommandBus';

export function PlayersMatchingModuleCore(
  eventPublisher: DomainEventPublisher,
  commandPublisher: CommandPublisher,
  currentTimeProvider: CurrentTimeProvider,
): ModuleCore {
  return {
    commandHandlers: [
      {
        commandType: MatchPlayersToTeams,
        handler: new MatchPlayersToTeamsCommandHandler(eventPublisher, currentTimeProvider),
      },
    ],
    eventHandlers: [
      {
        eventType: TournamentRegistrationsWereClosed,
        handler: new MatchPlayersWhenTournamentRegistrationsWereClosed(commandPublisher),
      },
    ],
    queryHandlers: [],
  };
}
