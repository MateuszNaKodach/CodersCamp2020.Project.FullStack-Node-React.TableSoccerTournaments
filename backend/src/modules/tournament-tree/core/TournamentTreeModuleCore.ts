import { CurrentTimeProvider } from '../../../shared/core/CurrentTimeProvider';
import { CreateTournamentTreeCommandHandler } from './application/command/CreateTournamentTreeCommandHandler';
import { TournamentWithTeamsWasCreated } from '../../doubles-tournament/core/domain/event/TournamentWithTeamsWasCreated';
import { FindTournamentTreeByTournamentId } from './application/query/FindTournamentTreeByTournamentId';
import { ModuleCore } from '../../../shared/core/ModuleCore';
import { FindTournamentTreeByTournamentIdQueryHandler } from './application/query/FindTournamentTreeByTournamentIdQueryHandler';
import { TournamentTreeRepository } from './application/TournamentTreeRepository';
import { EntityIdGenerator } from '../../../shared/core/application/EntityIdGenerator';
import { CommandPublisher } from '../../../shared/core/application/command/CommandBus';
import { CreateTournamentTreeWhenTournamentWithTeamsWasCreated } from './application/event/CreateTournamentTreeWhenTournamentWithTeamsWasCreated';
import { CreateTournamentTree } from './application/command/CreateTournamentTree';
import { DomainEventPublisher } from '../../../shared/core/application/event/DomainEventBus';

export function TournamentTreeModuleCore(
  eventPublisher: DomainEventPublisher,
  commandPublisher: CommandPublisher,
  currentTimeProvider: CurrentTimeProvider,
  entityIdGenerator: EntityIdGenerator,
  repository: TournamentTreeRepository,
): ModuleCore {
  return {
    commandHandlers: [
      {
        commandType: CreateTournamentTree,
        handler: new CreateTournamentTreeCommandHandler(eventPublisher, currentTimeProvider, entityIdGenerator, repository),
      },
    ],
    eventHandlers: [
      {
        eventType: TournamentWithTeamsWasCreated,
        handler: new CreateTournamentTreeWhenTournamentWithTeamsWasCreated(commandPublisher),
      },
    ],

    queryHandlers: [
      {
        queryType: FindTournamentTreeByTournamentId,
        handler: new FindTournamentTreeByTournamentIdQueryHandler(repository),
      },
    ],
  };
}
