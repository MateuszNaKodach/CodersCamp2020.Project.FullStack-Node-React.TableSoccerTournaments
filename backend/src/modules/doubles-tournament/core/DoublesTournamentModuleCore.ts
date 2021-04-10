import { DomainEventPublisher } from '../../../shared/core/application/event/DomainEventBus';
import { CommandPublisher } from '../../../shared/core/application/command/CommandBus';
import { CurrentTimeProvider } from '../../../shared/core/CurrentTimeProvider';
import { ModuleCore } from '../../../shared/core/ModuleCore';
import { CreateTournamentWithTeams } from './application/command/CreateTournamentWithTeams';
import { CreateTournamentWithTeamsCommandHandler } from './application/command/CreateTournamentWithTeamsCommandHandler';
import { PlayersWereMatchedIntoTeams } from '../../players-matching/core/domain/PlayersWereMatchedIntoTeams';
import { CreateTournamentWhenPlayersWereMatchedIntoTeams } from '../../players-matching/core/application/CreateTournamentWhenPlayersWereMatchedIntoTeams';
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
import { StartMatchAfterItsCalling } from './application/event/StartMatchAfterItsCalling';
import { TablesQueueRepository } from './application/TablesQueueRepository';
import { MatchWasQueued } from './domain/event/MatchWasQueued';
import { TournamentTableWasReleased } from '../../tournament-tables/core/domain/event/TournamentTableWasReleased';
import { MatchWasCalled } from './domain/event/MatchWasCalled';
import { BookTableInQueue } from './application/event/BookTableInQueue';
import { TournamentTableWasBooked } from '../../tournament-tables/core/domain/event/TournamentTableWasBooked';
import { ReleaseTableInQueue } from './application/event/ReleaseTableInQueue';
import { CallMatchWhenTournamentTableWasReleased } from './application/event/CallMatchWhenTournamentTableWasReleased';
import { CallMatchWhenMatchWasQueued } from './application/event/CallMatchWhenMatchWasQueued';
import { MatchHasEnded } from '../../match-module/core/domain/event/MatchHasEnded';
import { MatchHasEndedImpliesTournamentMatchWasEnded } from './application/event/MatchHasEndedImpliesTournamentMatchWasEnded';

export function DoublesTournamentModuleCore(
  eventPublisher: DomainEventPublisher,
  commandPublisher: CommandPublisher,
  currentTimeProvider: CurrentTimeProvider,
  entityIdGenerator: EntityIdGenerator,
  repository: DoublesTournamentRepository,
  matchesQueue: MatchesQueueRepository,
  tablesQueue: TablesQueueRepository,
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
        eventType: MatchWasQueued,
        handler: new CallMatchWhenMatchWasQueued(commandPublisher, matchesQueue, tablesQueue),
      },
      {
        eventType: MatchWasCalled,
        handler: new StartMatchAfterItsCalling(commandPublisher, matchesQueue),
      },
      {
        eventType: TournamentTableWasReleased,
        handler: new ReleaseTableInQueue(tablesQueue),
      },
      {
        eventType: TournamentTableWasReleased,
        handler: new CallMatchWhenTournamentTableWasReleased(commandPublisher, matchesQueue, tablesQueue),
      },
      {
        eventType: TournamentTableWasBooked,
        handler: new BookTableInQueue(tablesQueue),
      },
      {
        eventType: MatchHasEnded,
        handler: new MatchHasEndedImpliesTournamentMatchWasEnded(eventPublisher, currentTimeProvider),
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
