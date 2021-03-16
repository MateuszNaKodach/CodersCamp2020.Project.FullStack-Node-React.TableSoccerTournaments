import { EventHandler } from '../../../../../shared/core/application/event/EventHandler';
import { CommandPublisher } from '../../../../../shared/core/application/command/CommandBus';
import { PlayerProfileWasCreated } from '../../domain/event/PlayerProfileWasCreated';
import { SendEmail } from '../../../../email-sending/core/application/command/SendEmail';

export class SendEmailAfterPlayerProfileWasCreatedEventHandler implements EventHandler<PlayerProfileWasCreated> {
  constructor(private readonly commandPublisher: CommandPublisher) {}

  async handle(event: PlayerProfileWasCreated): Promise<void> {
    await this.commandPublisher.execute(
      new SendEmail({
        emailAddress: event.emailAddress,
        subject: `Welcome on board ${event.firstName}!`,
        htmlContent: `
        <div style="text-align: center">
            <h3>Your player profile was successfully created!</h3>
            <h1>We wish you good luck on oncoming tournament!</h1>
        </div>
        `,
      }),
    );
  }
}
