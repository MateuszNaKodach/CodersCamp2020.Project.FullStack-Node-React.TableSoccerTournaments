import { ModuleCore } from '../../../../shared/core/ModuleCore';
import { SendEmail } from './command/SendEmail';
import { SendEmailCommandHandler } from './command/SendEmailCommandHandler';

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
