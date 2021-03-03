import { DomainEventPublisher } from '../../../shared/core/application/event/DomainEventBus';
import { CommandPublisher } from '../../../shared/core/application/command/CommandBus';
import { CurrentTimeProvider } from '../../../shared/core/CurrentTimeProvider';
import { ModuleCore } from '../../../shared/core/ModuleCore';
import { StartMatch } from './application/command/StartMatch';
import { StartMatchCommandHandler } from './application/command/StartMatchCommandHandler';
import {FindMatchById} from "./application/query/FindMatchById";
import {FindMatchByIdQueryHandler} from "./application/query/FindMatchByIdQueryHandler";
import {MatchRepository} from "./application/MatchRepository";
import {FindAllMatches} from "./application/query/FindAllMatches";
import {FindAllMatchesQueryHandler} from "./application/query/FindAllMatchesQueryHandler";

export function MatchModuleCore(
  eventPublisher: DomainEventPublisher,
  commandPublisher: CommandPublisher,
  currentTimeProvider: CurrentTimeProvider,
  repository: MatchRepository
): ModuleCore {
  return {
    commandHandlers: [
      {
        commandType: StartMatch,
        handler: new StartMatchCommandHandler(eventPublisher, currentTimeProvider, repository),
      },
    ],
    eventHandlers: [],
    queryHandlers: [
      {
        queryType: FindMatchById,
        handler: new FindMatchByIdQueryHandler(repository),
      },
      {
        queryType: FindAllMatches,
        handler: new FindAllMatchesQueryHandler(repository),
      },
    ],
  };
}
