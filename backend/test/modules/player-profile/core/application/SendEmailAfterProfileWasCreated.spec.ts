import { PlayerProfileWasCreated } from '../../../../../src/modules/player-profiles/core/domain/event/PlayerProfileWasCreated';
import { CommandBus } from '../../../../../src/shared/core/application/command/CommandBus';
import { SendEmail } from '../../../../../src/modules/email-sending/core/application/command/SendEmail';
import { testPlayerProfileModule } from './TestPlayerProfileModule';

describe('Send an email to player', () => {
  it('When player profile is created, then execute command for email sending', async () => {
    //Given
    const currentTime = new Date();
    const commandBus: CommandBus = {
      registerHandler: jest.fn(),
      execute: jest.fn(),
    };
    const playerProfileModuleCore = testPlayerProfileModule(currentTime, commandBus);
    const firstName = 'Johnny';
    const emailAddress = 'bravo@gmail.com';

    const playerProfileWasCreated = new PlayerProfileWasCreated({
      occurredAt: currentTime,
      playerId: 'PlayerId',
      firstName: firstName,
      lastName: 'Bravo',
      emailAddress: emailAddress,
      phoneNumber: '123456789',
    });

    //When
    playerProfileModuleCore.publishEvent(playerProfileWasCreated);

    //Then
    const sendEmail = new SendEmail({
      subject: 'Welcome on board Johnny!',
      emailAddress: 'bravo@gmail.com',
      htmlContent: `
        <div style="text-align: center">
            <h3>Your player profile was successfully created!</h3>
            <h1>We wish you good luck on oncoming tournament!</h1>
        </div>
        `,
    });
    expect(commandBus.execute).toBeCalledWith(sendEmail);
  });
});
