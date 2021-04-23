import { DomainEventPublisher } from '../../../shared/core/application/event/DomainEventBus';
import { CommandPublisher } from '../../../shared/core/application/command/CommandBus';
import { CurrentTimeProvider } from '../../../shared/core/CurrentTimeProvider';
import { ModuleCore } from '../../../shared/core/ModuleCore';
import { SetPassword } from './application/command/SetPassword';
import { SetPasswordCommandHandler } from './application/command/SetPasswordCommandHandler';
import { AuthenticationRepository } from './application/AuthenticationRepository';

export function AuthenticationModuleCore(
  eventPublisher: DomainEventPublisher,
  commandPublisher: CommandPublisher,
  currentTimeProvider: CurrentTimeProvider,
  repository: AuthenticationRepository,
): ModuleCore {
  return {
    commandHandlers: [
      {
        commandType: SetPassword,
        handler: new SetPasswordCommandHandler(eventPublisher, currentTimeProvider, repository),
      },
    ],
    eventHandlers: [],
    queryHandlers: [],
  };
}
