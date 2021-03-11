import { DomainEventPublisher } from '../../../shared/core/application/event/DomainEventBus';
import { CommandPublisher } from '../../../shared/core/application/command/CommandBus';
import { CurrentTimeProvider } from '../../../shared/core/CurrentTimeProvider';
import { ModuleCore } from '../../../shared/core/ModuleCore';
import { CreateTournamentWithTeams } from './application/command/CreateTournamentWithTeams';
import { CreateTournamentWithTeamsCommandHandler } from './application/command/CreateTournamentWithTeamsCommandHandler';
import { PlayersWereMatchedIntoTeams } from '../../players-matching/core/domain/PlayersWereMatchedIntoTeams';
import { CreateTournamentWhenPlayersWereMatchedIntoTeams } from './application/event/CreateTournamentWhenPlayersWereMatchedIntoTeams';
import { EntityIdGenerator } from '../../../shared/core/application/EntityIdGenerator';
import { DoublesTournamentRepository } from './application/DoublesTournamentRepository';
import { FindAllDoublesTournaments } from './application/query/FindAllDoublesTournaments';
import { FindAllDoublesTournamentsQueryHandler } from './application/query/FindAllDoublesTournamentsQueryHandler';
import { FindDoublesTournamentById } from './application/query/FindDoublesTournamentById';
import { FindDoublesTournamentByIdQueryHandler } from './application/query/FindDoublesTournamentByIdQueryHandler';
import { QueueMatch } from './application/command/QueueMatch';
import { QueueMatchCommandHandler } from './application/command/QueueMatchCommandHandler';
import { MatchesQueueRepository } from './application/MatchesQueueRepository';

export function DoublesTournamentModuleCore(
  eventPublisher: DomainEventPublisher,
  commandPublisher: CommandPublisher,
  currentTimeProvider: CurrentTimeProvider,
  entityIdGenerator: EntityIdGenerator,
  repository: DoublesTournamentRepository,
  matchesQueue: MatchesQueueRepository,
): ModuleCore {
  return {
    commandHandlers: [
      {
        commandType: CreateTournamentWithTeams,
        handler: new CreateTournamentWithTeamsCommandHandler(eventPublisher, currentTimeProvider, entityIdGenerator, repository),
      },
      {
        commandType: QueueMatch,
        handler: new QueueMatchCommandHandler(eventPublisher, currentTimeProvider, repository, matchesQueue),
      },
    ],
    eventHandlers: [
      {
        eventType: PlayersWereMatchedIntoTeams,
        handler: new CreateTournamentWhenPlayersWereMatchedIntoTeams(commandPublisher),
      },
    ],
    queryHandlers: [
      {
        queryType: FindAllDoublesTournaments,
        handler: new FindAllDoublesTournamentsQueryHandler(repository),
      },
      {
        queryType: FindDoublesTournamentById,
        handler: new FindDoublesTournamentByIdQueryHandler(repository),
      },
    ],
  };
}
