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

    //When
    playerProfileModuleCore.publishEvent(playerProfileWasCreated);

    //Then
    //TODO check if commandPublisher from playerProfileModuleCore execute command with type SendEmail!
    // sth like expect(playerProfileModuleCore.commandPublisher.execute(SendEmail)).toBeCalledWith()
  });

  function testPlayerProfileModule_2(currentTime: Date): TestModuleCore {
    const playerProfilesRepository = new InMemoryPlayerProfileRepository();
    const commandPublisher: CommandPublisher = {
      execute: jest.fn(),
    };

    return testModuleCore((commandBus, eventBus, queryBus) =>
      PlayerProfilesModuleCore(eventBus, commandPublisher, () => currentTime, playerProfilesRepository),
    );
  }
});
