import { CommandHandler } from '../../../../../shared/core/application/command/CommandHandler';
import { SendEmail } from './SendEmail';
import { CommandResult } from '../../../../../shared/core/application/command/CommandResult';
import { EmailSender } from '../EmailSender';

export class SendEmailCommandHandler implements CommandHandler<SendEmail> {
  constructor(private readonly emailSender: EmailSender) {}

  async execute(command: SendEmail): Promise<CommandResult> {
    await this.emailSender.sendAnEmail({
      from: 'TourDeFoos <TourDeFoos@gmail.com>',
      to: command.emailAddress,
      subject: command.subject,
      html: command.htmlContent,
    });

    return CommandResult.success();
  }
}
