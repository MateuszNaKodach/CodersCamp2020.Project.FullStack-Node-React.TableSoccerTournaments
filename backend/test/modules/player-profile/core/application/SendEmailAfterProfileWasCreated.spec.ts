import { testPlayerProfileModule } from './TestPlayerProfileModule';
import { PlayerProfileWasCreated } from '../../../../../src/modules/player-profiles/core/domain/event/PlayerProfileWasCreated';

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

    //When
    playerProfileModuleCore.publishEvent(playerProfileWasCreated);

    //Then
    //what to check here ???
    // if eventHandler handle event above or if ?commandPublisher? execute command from email module??
  });
});
