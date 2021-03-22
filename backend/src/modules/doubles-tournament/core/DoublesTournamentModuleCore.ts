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
import { EnqueueMatch } from './application/command/EnqueueMatch';
import { EnqueueMatchCommandHandler } from './application/command/EnqueueMatchCommandHandler';
import { MatchesQueueRepository } from './application/MatchesQueueRepository';
import { FindMatchesQueueByTournamentId } from './application/query/FindMatchesQueueByTournamentId';
import { FindMatchesQueueByTournamentIdQueryHandler } from './application/query/FindMatchesQueueByTournamentIdQueryHandler';
import { CallMatch } from './application/command/CallMatch';
import { CallMatchCommandHandler } from './application/command/CallMatchCommandHandler';
import { MatchWasCalled } from './domain/event/MatchWasCalled';
import { StartMatchAfterItsCalling } from './application/event/StartMatchAfterItsCalling';

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
        commandType: EnqueueMatch,
        handler: new EnqueueMatchCommandHandler(eventPublisher, currentTimeProvider, repository, matchesQueue),
      },
      {
        commandType: CallMatch,
        handler: new CallMatchCommandHandler(eventPublisher, currentTimeProvider, commandPublisher),
      },
    ],
    eventHandlers: [
      {
        eventType: PlayersWereMatchedIntoTeams,
        handler: new CreateTournamentWhenPlayersWereMatchedIntoTeams(commandPublisher),
      },
      {
        eventType: MatchWasCalled,
        handler: new StartMatchAfterItsCalling(commandPublisher),
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
      {
        queryType: FindMatchesQueueByTournamentId,
        handler: new FindMatchesQueueByTournamentIdQueryHandler(matchesQueue),
      },
    ],
  };
}
