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
        content: `Your player profile was successfully created! \n
                We wish you good luck on oncoming tournament!,`,
      }),
    );
  }
}
