import { ModuleCore } from '../../../shared/core/ModuleCore';
import { SendEmail } from './application/command/SendEmail';
import { SendEmailCommandHandler } from './application/command/SendEmailCommandHandler';
import { EmailSender } from './application/EmailSender';

export function SendEmailModuleCore(emailSender: EmailSender): ModuleCore {
  return {
    commandHandlers: [
      {
        commandType: SendEmail,
        handler: new SendEmailCommandHandler(emailSender),
      },
    ],
    eventHandlers: [],
    queryHandlers: [],
  };
}
