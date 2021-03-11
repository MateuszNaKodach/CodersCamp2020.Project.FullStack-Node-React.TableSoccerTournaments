import { PlayerProfileWasCreated } from '../../../../../src/modules/player-profiles/core/domain/event/PlayerProfileWasCreated';
import { CommandPublisher } from '../../../../../src/shared/core/application/command/CommandBus';
import { SendEmailAfterPlayerProfileWasCreatedEventHandler } from '../../../../../src/modules/player-profiles/core/application/event/SendEmailAfterPlayerProfileWasCreatedEventHandler';
import { SendEmail } from '../../../../../src/modules/email-sending/core/application/command/SendEmail';
import { testModuleCore, TestModuleCore } from '../../../../test-support/shared/core/TestModuleCore';
import { InMemoryPlayerProfileRepository } from '../../../../../src/modules/player-profiles/infrastructure/repository/inmemory/InMemoryPlayerProfileRepository';
import { PlayerProfilesModuleCore } from '../../../../../src/modules/player-profiles/core/PlayerProfilesModuleCore';

describe('Send an email to player', () => {
  it('When player profile is created, then execute command for email sending', async () => {
    //Given
    const currentTime = new Date();
    const playerProfileModuleCore = testPlayerProfileModule_2(currentTime);
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

    const sendEmail = new SendEmail({
      subject: 'test',
      emailAddress: 'test@gmail.com',
      htmlContent: '<div>test</div>',
    });

    // const commandPublisher: CommandPublisher = {
    //   execute: jest.fn(),
    // };
    // new SendEmailAfterPlayerProfileWasCreatedEventHandler(commandPublisher);

    // const sendEmailAfterPlayerProfileWasCreatedEventHandler = new SendEmailAfterPlayerProfileWasCreatedEventHandler(commandPublisher);
    // await sendEmailAfterPlayerProfileWasCreatedEventHandler.handle(playerProfileWasCreated);

    //When
    playerProfileModuleCore.publishEvent(playerProfileWasCreated);
    const commandResult = await playerProfileModuleCore.executeCommand(sendEmail);

    //Then
    expect(commandResult.isSuccess()).toBeTruthy();

    // expect(playerProfileModuleCore.executeCommand()).toHaveBeenCalled();
    // expect(sendEmailAfterPlayerProfileWasCreatedEventHandler.handle).toHaveBeenCalled();
  });

  function testPlayerProfileModule_2(currentTime: Date): TestModuleCore {
    const playerProfilesRepository = new InMemoryPlayerProfileRepository();
    const commandPublisher: CommandPublisher = {
      execute: jest.fn(),
    };

    const sendEmailAfterPlayerProfileWasCreatedEventHandler = new SendEmailAfterPlayerProfileWasCreatedEventHandler(commandPublisher);
    const playerProfileWasCreated = new PlayerProfileWasCreated({
      occurredAt: currentTime,
      playerId: 'PlayerId',
      firstName: 'firstName',
      lastName: 'Bravo',
      emailAddress: 'emailAddress',
      phoneNumber: '123456789',
    });

    return testModuleCore((commandBus, eventBus, queryBus) =>
      PlayerProfilesModuleCore(
        eventBus.registerHandler(playerProfileWasCreated, sendEmailAfterPlayerProfileWasCreatedEventHandler),
        commandPublisher,
        () => currentTime,
        playerProfilesRepository,
      ),
    );
  }
});
