import { testPlayerProfileModule } from './TestPlayerProfileModule';
import { CreatePlayerProfile } from '../../../../../src/modules/player-profiles/core/application/command/CreatePlayerProfile';
import { PlayerProfileWasCreated } from '../../../../../src/modules/player-profiles/core/domain/event/PlayerProfileWasCreated';
import { CommandResult } from '../../../../../src/shared/core/application/command/CommandResult';
import Failure = CommandResult.Failure;

describe('Player profile | Write Side', () => {
  const playerId = 'PlayerId';
  const firstName = 'Johnny';
  const lastName = 'Bravo';
  const emailAddress = 'bravo@gmail.com';
  const phoneNumber = '123456789';

  it('Given data of not yet created player profile, when create player profile, then new player profile was created', async () => {
    //Given
    const currentTime = new Date();
    const playerProfileModuleCore = testPlayerProfileModule(currentTime);

    //When
    const createPlayerProfileCommand = new CreatePlayerProfile({
      playerId,
      firstName,
      lastName,
      emailAddress,
      phoneNumber,
    });
    const commandResult = await playerProfileModuleCore.executeCommand(createPlayerProfileCommand);

    //Then
    expect(commandResult.isSuccess()).toBeTruthy();

    expect(playerProfileModuleCore.lastPublishedEvent()).toStrictEqual(
      new PlayerProfileWasCreated({
        occurredAt: currentTime,
        playerId,
        firstName,
        lastName,
        emailAddress,
        phoneNumber,
      }),
    );
  });

  it('given new player profile data (such playerId already exists), when create player profile, then command should fail', async () => {
    //Given
    const currentTime = new Date();
    const playerProfileModuleCore = testPlayerProfileModule(currentTime);

    const createPlayerProfileCommand = new CreatePlayerProfile({
      playerId,
      firstName,
      lastName,
      emailAddress,
      phoneNumber,
    });

    const createPlayerProfileCommand2 = new CreatePlayerProfile({
      playerId: playerId,
      firstName: firstName,
      lastName: lastName,
      emailAddress: 'bravo2@gmail.com',
      phoneNumber: phoneNumber,
    });
    await playerProfileModuleCore.executeCommand(createPlayerProfileCommand);

    //When
    const commandResult = await playerProfileModuleCore.executeCommand(createPlayerProfileCommand2);

    //Then
    expect(commandResult.isSuccess()).toBeFalse();

    expect((commandResult as Failure).reason).toStrictEqual(new Error('Such player already exists!'));
  });

  it('given new player profile data (such player email already exists), when create player profile, then command should fail', async () => {
    //Given
    const currentTime = new Date();
    const playerProfileModuleCore = testPlayerProfileModule(currentTime);

    const createPlayerProfileCommand = new CreatePlayerProfile({
      playerId,
      firstName,
      lastName,
      emailAddress,
      phoneNumber,
    });

    const createPlayerProfileCommand2 = new CreatePlayerProfile({
      playerId: 'PlayerId1',
      firstName: firstName,
      lastName: lastName,
      emailAddress: emailAddress,
      phoneNumber: '1234567890',
    });

    await playerProfileModuleCore.executeCommand(createPlayerProfileCommand);

    //When
    const commandResult = await playerProfileModuleCore.executeCommand(createPlayerProfileCommand2);

    //Then
    expect(commandResult.isSuccess()).toBeFalse();

    expect((commandResult as Failure).reason).toStrictEqual(new Error('Such e-mail already exists!'));
  });
});
