import { CommandPublisherMock } from '../../../../test-support/shared/core/CommandPublisherMock';
import { CommandResult } from '../../../../../src/shared/core/application/command/CommandResult';
import { testModuleRestApi } from '../../../../test-support/shared/presentation/rest-api/TestModuleRestApi';
import { PlayerProfileRestApiModule } from '../../../../../src/modules/player-profiles/presentation/rest-api/PlayerProfileRestApiModule';
import { CreatePlayerProfile } from '../../../../../src/modules/player-profiles/core/application/command/CreatePlayerProfile';
import { StatusCodes } from 'http-status-codes';
import { QueryPublisherMock } from '../../../../test-support/shared/core/QueryPublisherMock';
import { PlayerId } from '../../../../../src/shared/core/domain/PlayerId';
import { PlayerProfile } from '../../../../../src/modules/player-profiles/core/domain/PlayerProfile';
import { FindAllPlayerProfiles } from '../../../../../src/modules/player-profiles/core/application/query/FindAllPlayerProfiles';
import { FindPlayerProfileById } from '../../../../../src/modules/player-profiles/core/application/query/FindPlayerProfileById';

describe('Player Profile REST API', () => {
  it('POST /rest-api/players-profiles | when command success', async () => {
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

  it('POST /rest-api/players-profiles | when command failure', async () => {
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

  it('GET /rest-api/players-profiles', async () => {
    //Given
    const queryPublisher = QueryPublisherMock([
      new PlayerProfile({
        playerId: PlayerId.from('samplePlayerId1'),
        firstName: 'SampleFirstName',
        lastName: 'SampleLastName',
        phoneNumber: 'SamplePhoneNumber',
        emailAddress: 'Sample email address',
      }),
      new PlayerProfile({
        playerId: PlayerId.from('samplePlayerId2'),
        firstName: 'SampleFirstName2',
        lastName: 'SampleLastName2',
        phoneNumber: 'SamplePhoneNumber2',
        emailAddress: 'Sample email address2',
      }),
    ]);

    const { agent } = testModuleRestApi(PlayerProfileRestApiModule, { queryPublisher });

    //When
    const { body, status } = await agent.get('/rest-api/players-profiles').send();

    //Then
    expect(queryPublisher.executeCalls).toBeCalledWith(new FindAllPlayerProfiles());
    expect(status).toBe(StatusCodes.OK);
    expect(body).toStrictEqual({
      items: [
        {
          playerId: 'samplePlayerId1',
          firstName: 'SampleFirstName',
          lastName: 'SampleLastName',
          phoneNumber: 'SamplePhoneNumber',
          emailAddress: 'Sample email address',
        },
        {
          playerId: 'samplePlayerId2',
          firstName: 'SampleFirstName2',
          lastName: 'SampleLastName2',
          phoneNumber: 'SamplePhoneNumber2',
          emailAddress: 'Sample email address2',
        },
      ],
    });
  });

  it('GET /rest-api/players-profiles/:playerId | when player profile with given ID is found', async () => {
    //Given
    const queryPublisher = QueryPublisherMock(
      new PlayerProfile({
        playerId: PlayerId.from('samplePlayerId1'),
        firstName: 'SampleFirstName',
        lastName: 'SampleLastName',
        phoneNumber: 'SamplePhoneNumber',
        emailAddress: 'Sample email address',
      }),
    );
    const { agent } = testModuleRestApi(PlayerProfileRestApiModule, { queryPublisher });

    //When
    const { body, status } = await agent.get('/rest-api/players-profiles/samplePlayerId1').send();

    //Then
    expect(queryPublisher.executeCalls).toBeCalledWith(new FindPlayerProfileById({ playerId: 'samplePlayerId1' }));
    expect(status).toBe(StatusCodes.OK);
    expect(body).toStrictEqual({
      playerId: 'samplePlayerId1',
      firstName: 'SampleFirstName',
      lastName: 'SampleLastName',
      phoneNumber: 'SamplePhoneNumber',
      emailAddress: 'Sample email address',
    });
  });

  it('GET /rest-api/players-profiles/:playerId | when player profile with given ID is not found', async () => {
    //Given
    const queryPublisher = QueryPublisherMock(undefined);
    const { agent } = testModuleRestApi(PlayerProfileRestApiModule, { queryPublisher });

    //When
    const { body, status } = await agent.get('/rest-api/players-profiles/samplePlayerId1').send();

    //Then
    expect(queryPublisher.executeCalls).toBeCalledWith(new FindPlayerProfileById({ playerId: 'samplePlayerId1' }));
    expect(status).toBe(StatusCodes.NOT_FOUND);
    expect(body).toStrictEqual({ message: 'Player profile with id = samplePlayerId1 not found!' });
  });
});
