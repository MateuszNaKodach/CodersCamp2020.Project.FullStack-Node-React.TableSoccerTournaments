import { testPlayerProfileModule } from './TestPlayerProfileModule';
import { PlayerProfileWasCreated } from '../../../../../src/modules/player-profiles/core/domain/event/PlayerProfileWasCreated';
import { CommandPublisher } from '../../../../../src/shared/core/application/command/CommandBus';
import { SendEmailAfterPlayerProfileWasCreatedEventHandler } from '../../../../../src/modules/player-profiles/core/application/event/SendEmailAfterPlayerProfileWasCreatedEventHandler';

describe('Send an email to player', () => {
  it('When player profile is created, then execute command for email sending', () => {
    //Given
    const currentTime = new Date();
    const playerProfileModuleCore = testPlayerProfileModule(currentTime);
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

    const commandPublisher: CommandPublisher = {
      execute: jest.fn(),
    };
    new SendEmailAfterPlayerProfileWasCreatedEventHandler(commandPublisher);
    // const sendEmailAfterPlayerProfileWasCreatedEventHandler = new SendEmailAfterPlayerProfileWasCreatedEventHandler(commandPublisher);
    // await sendEmailAfterPlayerProfileWasCreatedEventHandler.handle(playerProfileWasCreated);

    //When
    playerProfileModuleCore.publishEvent(playerProfileWasCreated);

    //Then
    expect(commandPublisher.execute).toHaveBeenCalled();
    // expect(sendEmailAfterPlayerProfileWasCreatedEventHandler.handle).toHaveBeenCalled();
  });
});
