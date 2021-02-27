import { DomainEventPublisher } from '../../../shared/core/application/event/DomainEventBus';
import { CommandPublisher } from '../../../shared/core/application/command/CommandBus';
import { CurrentTimeProvider } from '../../../shared/core/CurrentTimeProvider';
import { ModuleCore } from '../../../shared/core/ModuleCore';
import { CreateTournamentWithTeams } from './application/command/CreateTournamentWithTeams';
import { CreateTournamentWithTeamsCommandHandler } from './application/command/CreateTournamentWithTeamsCommandHandler';
import { PlayersWereMatchedIntoTeams } from '../../players-matching/core/domain/PlayersWereMatchedIntoTeams';
import { CreateTournamentWhenPlayersWereMatchedIntoTeams } from './application/event/CreateTournamentWhenPlayersWereMatchedIntoTeams';
import { EntityIdGenerator } from '../../../shared/core/application/EntityIdGenerator';

export function DoublesTournamentModuleCore(
  eventPublisher: DomainEventPublisher,
  commandPublisher: CommandPublisher,
  currentTimeProvider: CurrentTimeProvider,
  entityIdGenerator: EntityIdGenerator,
): ModuleCore {
  return {
    commandHandlers: [
      {
        commandType: CreateTournamentWithTeams,
        handler: new CreateTournamentWithTeamsCommandHandler(eventPublisher, currentTimeProvider, entityIdGenerator),
      },
    ],
    eventHandlers: [
      {
        eventType: PlayersWereMatchedIntoTeams,
        handler: new CreateTournamentWhenPlayersWereMatchedIntoTeams(commandPublisher),
      },
    ],
    queryHandlers: [],
  };
}
