import { CommandPublisherMock } from '../../../../test-support/shared/core/CommandPublisherMock';
import { CommandResult } from '../../../../../src/shared/core/application/command/CommandResult';
import { testModuleRestApi } from '../../../../test-support/shared/presentation/rest-api/TestModuleRestApi';
import { PlayerProfileRestApiModule } from '../../../../../src/modules/player-profiles/presentation/rest-api/PlayerProfileRestApiModule';
import { CreatePlayerProfile } from '../../../../../src/modules/player-profiles/core/application/command/CreatePlayerProfile';
import { StatusCodes } from 'http-status-codes';

describe('Player Profile REST API', () => {
  it('POST /rest-api/tournament-registrations | when command success', async () => {
    //Given
    const commandPublisher = CommandPublisherMock(CommandResult.success());
    const { agent } = testModuleRestApi(PlayerProfileRestApiModule, { commandPublisher });

    //When
    const { body, status } = await agent.post('/rest-api/players-profiles').send({
      playerId: 'SamplePlayerProfileId',
      firstName: 'SampleFirstName',
      lastName: 'SampleLastName',
      phoneNumber: 'SamplePhoneNumber',
      emailAddress: 'Sample email address',
    });

    //Then
    expect(commandPublisher.executeCalls).toBeCalledWith(
      new CreatePlayerProfile({
        playerId: 'SamplePlayerProfileId',
        firstName: 'SampleFirstName',
        lastName: 'SampleLastName',
        phoneNumber: 'SamplePhoneNumber',
        emailAddress: 'Sample email address',
      }),
    );
    expect(status).toBe(StatusCodes.CREATED);
    expect(body).toStrictEqual({
      playerId: 'SamplePlayerProfileId',
      firstName: 'SampleFirstName',
      lastName: 'SampleLastName',
      phoneNumber: 'SamplePhoneNumber',
      emailAddress: 'Sample email address',
    });
  });

  it('POST /rest-api/tournament-registrations | when command failure', async () => {
    //Given
    const commandPublisher = CommandPublisherMock(CommandResult.failureDueTo(new Error('Such player already exists!')));
    const { agent } = testModuleRestApi(PlayerProfileRestApiModule, { commandPublisher });

    //When
    const { body, status } = await agent.post('/rest-api/players-profiles').send({
      playerId: 'SamplePlayerProfileId',
      firstName: 'SampleFirstName',
      lastName: 'SampleLastName',
      phoneNumber: 'SamplePhoneNumber',
      emailAddress: 'Sample email address',
    });

    //Then
    expect(commandPublisher.executeCalls).toBeCalledWith(
      new CreatePlayerProfile({
        playerId: 'SamplePlayerProfileId',
        firstName: 'SampleFirstName',
        lastName: 'SampleLastName',
        phoneNumber: 'SamplePhoneNumber',
        emailAddress: 'Sample email address',
      }),
    );
    expect(status).toBe(StatusCodes.BAD_REQUEST);
    expect(body).toStrictEqual({ message: 'Such player already exists!' });
  });
});
