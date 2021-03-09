import { ModuleCore } from '../../../shared/core/ModuleCore';
import { SendEmail } from './application/command/SendEmail';
import { SendEmailCommandHandler } from './application/command/SendEmailCommandHandler';

export function SendEmailModuleCore(): ModuleCore {
  return {
    commandHandlers: [
      {
        commandType: SendEmail,
        handler: new SendEmailCommandHandler(),
      },
    ],
    eventHandlers: [],
    queryHandlers: [],
  };
}
