import { ModuleCore } from '../../../shared/core/ModuleCore';
import { FindAllPlayerProfiles } from './application/query/FindAllPlayerProfiles';
import { FindAllPlayerProfilesQueryHandler } from './application/query/FindAllPlayerProfilesQueryHandler';
import { PlayerProfilesRepository } from './application/PlayerProfilesRepository';
import { CreatePlayerProfile } from './application/command/CreatePlayerProfile';
import { CreatePlayerProfileCommandHandler } from './application/command/CreatePlayerProfileCommandHandler';
import { DomainEventPublisher } from '../../../shared/core/application/event/DomainEventBus';
import { CurrentTimeProvider } from '../../../shared/core/CurrentTimeProvider';

export function PlayerProfilesModuleCore(
  eventPublisher: DomainEventPublisher,
  currentTimeProvider: CurrentTimeProvider,
  playerProfileRepository: PlayerProfilesRepository,
): ModuleCore {
  return {
    commandHandlers: [
      {
        commandType: CreatePlayerProfile,
        handler: new CreatePlayerProfileCommandHandler(eventPublisher, currentTimeProvider, playerProfileRepository),
      },
    ],
    eventHandlers: [],
    queryHandlers: [
      {
        queryType: FindAllPlayerProfiles,
        handler: new FindAllPlayerProfilesQueryHandler(playerProfileRepository),
      },
    ],
  };
}
