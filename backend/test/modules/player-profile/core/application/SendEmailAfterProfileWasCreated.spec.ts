import { testPlayerProfileModule } from './TestPlayerProfileModule';
import { PlayerProfileWasCreated } from '../../../../../src/modules/player-profiles/core/domain/event/PlayerProfileWasCreated';
import { CommandPublisherMock } from '../../../../test-support/shared/core/CommandPublisherMock';

describe('Send an email to player', () => {
  it('When player profile is created, then execute command for email sending', async () => {
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

    const commandPublisher = CommandPublisherMock(); // ?????

    //When
    playerProfileModuleCore.publishEvent(playerProfileWasCreated);

    //Then
    expect(commandPublisher.executeCalls()); //????
  });
});
