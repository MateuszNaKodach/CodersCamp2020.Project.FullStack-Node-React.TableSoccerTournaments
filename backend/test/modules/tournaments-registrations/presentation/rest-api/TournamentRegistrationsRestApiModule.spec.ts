import { testModuleRestApi } from '../../../../test-support/shared/presentation/rest-api/TestModuleRestApi';
import { TournamentRegistrationsRestApiModule } from '../../../../../src/modules/tournaments-registrations/presentation/rest-api/TournamentRegistrationsRestApiModule';
import { StatusCodes } from 'http-status-codes';
import { CommandPublisherMock } from '../../../../test-support/shared/core/CommandPublisherMock';
import { CommandResult } from '../../../../../src/shared/core/application/command/CommandResult';
import { OpenTournamentRegistrations } from '../../../../../src/modules/tournaments-registrations/core/application/command/OpenTournamentRegistrations';
import { RegisterPlayerForTournament } from '../../../../../src/modules/tournaments-registrations/core/application/command/RegisterPlayerForTournament';
import { CloseTournamentRegistrations } from '../../../../../src/modules/tournaments-registrations/core/application/command/CloseTournamentRegistrations';
import { QueryPublisherMock } from '../../../../test-support/shared/core/QueryPublisherMock';
import { TournamentRegistrations } from '../../../../../src/modules/tournaments-registrations/core/domain/TournamentRegistrations';
import { TournamentId } from '../../../../../src/modules/tournaments-registrations/core/domain/TournamentId';
import { RegistrationsStatus } from '../../../../../src/modules/tournaments-registrations/core/domain/RegistrationsStatus';
import { PlayerId } from '../../../../../src/modules/tournaments-registrations/core/domain/PlayerId';
import { FindAllTournamentRegistrations } from '../../../../../src/modules/tournaments-registrations/core/application/query/FindAllTournamentRegistrations';
import { TournamentRegistrationsDto } from '../../../../../src/modules/tournaments-registrations/presentation/rest-api/response/TournamentRegistrationsDto';
import { TournamentRegistrationsListDto } from '../../../../../src/modules/tournaments-registrations/presentation/rest-api/response/TournamentRegistrationsListDto';
import { FindTournamentRegistrationsById } from '../../../../../src/modules/tournaments-registrations/core/application/query/FindTournamentRegistrationsById';

describe('Tournament Registrations REST API', () => {
  it('POST /rest-api/tournament-registrations | when command success', async () => {
    //Given
    const commandPublisher = CommandPublisherMock(CommandResult.success());
    const { agent } = testModuleRestApi(TournamentRegistrationsRestApiModule, { commandPublisher });

    //When
    const { body, status } = await agent.post('/rest-api/tournament-registrations').send();

    //Then
    expect(commandPublisher.executeCalls).toBeCalledWith(new OpenTournamentRegistrations({ tournamentId: 'StubEntityId' }));
    expect(status).toBe(StatusCodes.CREATED);
    expect(body).toBeEmpty();
  });

  it('POST /rest-api/tournament-registrations | when command failure', async () => {
    //Given
    const commandPublisher = CommandPublisherMock(CommandResult.failureDueTo(new Error('Registrations was opened before!')));
    const { agent } = testModuleRestApi(TournamentRegistrationsRestApiModule, { commandPublisher });

    //When
    const { body, status } = await agent.post('/rest-api/tournament-registrations').send();

    //Then
    expect(commandPublisher.executeCalls).toBeCalledWith(new OpenTournamentRegistrations({ tournamentId: 'StubEntityId' }));
    expect(status).toBe(StatusCodes.BAD_REQUEST);
    expect(body).toStrictEqual({ message: 'Registrations was opened before!' });
  });

  it('POST /rest-api/tournament-registrations/:tournamentId/players | when command success', async () => {
    //Given
    const commandPublisher = CommandPublisherMock(CommandResult.success());
    const { agent } = testModuleRestApi(TournamentRegistrationsRestApiModule, { commandPublisher });

    //When
    const { body, status } = await agent
      .post('/rest-api/tournament-registrations/sampleTournamentId/players')
      .send({ playerId: 'samplePlayerId' });

    //Then
    expect(commandPublisher.executeCalls).toBeCalledWith(
      new RegisterPlayerForTournament({ tournamentId: 'sampleTournamentId', playerId: 'samplePlayerId' }),
    );
    expect(status).toBe(StatusCodes.OK);
    expect(body).toBeEmpty();
  });

  it('POST /rest-api/tournament-registrations/:tournamentId/players | when command failure', async () => {
    //Given
    const commandPublisher = CommandPublisherMock(
      CommandResult.failureDueTo(new Error('Cannot register player for closed tournament registrations!')),
    );
    const { agent } = testModuleRestApi(TournamentRegistrationsRestApiModule, { commandPublisher });

    //When
    const { body, status } = await agent
      .post('/rest-api/tournament-registrations/sampleTournamentId/players')
      .send({ playerId: 'samplePlayerId' });

    //Then
    expect(commandPublisher.executeCalls).toBeCalledWith(
      new RegisterPlayerForTournament({ tournamentId: 'sampleTournamentId', playerId: 'samplePlayerId' }),
    );
    expect(status).toBe(StatusCodes.BAD_REQUEST);
    expect(body).toStrictEqual({ message: 'Cannot register player for closed tournament registrations!' });
  });

  it('POST /rest-api/tournament-registrations/:tournamentId/close | when command success', async () => {
    //Given
    const commandPublisher = CommandPublisherMock(CommandResult.success());
    const { agent } = testModuleRestApi(TournamentRegistrationsRestApiModule, { commandPublisher });

    //When
    const { body, status } = await agent.post('/rest-api/tournament-registrations/sampleTournamentId/close').send();

    //Then
    expect(commandPublisher.executeCalls).toBeCalledWith(new CloseTournamentRegistrations({ tournamentId: 'sampleTournamentId' }));
    expect(status).toBe(StatusCodes.OK);
    expect(body).toBeEmpty();
  });

  it('POST /rest-api/tournament-registrations/:tournamentId/close | when command failure', async () => {
    //Given
    const commandPublisher = CommandPublisherMock(CommandResult.failureDueTo(new Error('Only opened registrations can be closed!')));
    const { agent } = testModuleRestApi(TournamentRegistrationsRestApiModule, { commandPublisher });

    //When
    const { body, status } = await agent.post('/rest-api/tournament-registrations/sampleTournamentId/close').send();

    //Then
    expect(commandPublisher.executeCalls).toBeCalledWith(new CloseTournamentRegistrations({ tournamentId: 'sampleTournamentId' }));
    expect(status).toBe(StatusCodes.BAD_REQUEST);
    expect(body).toStrictEqual({ message: 'Only opened registrations can be closed!' });
  });

  it('GET /rest-api/tournament-registrations', async () => {
    //Given
    const queryPublisher = QueryPublisherMock([
      new TournamentRegistrations({ tournamentId: TournamentId.from('sampleTournamentId1'), status: RegistrationsStatus.OPENED }),
      new TournamentRegistrations({
        tournamentId: TournamentId.from('sampleTournamentId2'),
        status: RegistrationsStatus.CLOSED,
        registeredPlayers: [PlayerId.from('1'), PlayerId.from('2')],
      }),
    ]);
    const { agent } = testModuleRestApi(TournamentRegistrationsRestApiModule, { queryPublisher });

    //When
    const { body, status } = await agent.get('/rest-api/tournament-registrations').send();

    //Then
    expect(queryPublisher.executeCalls).toBeCalledWith(new FindAllTournamentRegistrations());
    expect(status).toBe(StatusCodes.OK);
    expect(body).toStrictEqual({
      items: [
        { tournamentId: 'sampleTournamentId1', status: 'OPENED', registeredPlayersIds: [] },
        { tournamentId: 'sampleTournamentId2', status: 'CLOSED', registeredPlayersIds: ['1', '2'] },
      ],
    });
  });

  it('GET /rest-api/tournament-registrations/:tournamentId | when tournament with given if found', async () => {
    //Given
    const queryPublisher = QueryPublisherMock(
      new TournamentRegistrations({
        tournamentId: TournamentId.from('sampleTournamentId2'),
        status: RegistrationsStatus.CLOSED,
        registeredPlayers: [PlayerId.from('1'), PlayerId.from('2')],
      }),
    );
    const { agent } = testModuleRestApi(TournamentRegistrationsRestApiModule, { queryPublisher });

    //When
    const { body, status } = await agent.get('/rest-api/tournament-registrations/sampleTournamentId2').send();

    //Then
    expect(queryPublisher.executeCalls).toBeCalledWith(new FindTournamentRegistrationsById({ tournamentId: 'sampleTournamentId2' }));
    expect(status).toBe(StatusCodes.OK);
    expect(body).toStrictEqual({ tournamentId: 'sampleTournamentId2', status: 'CLOSED', registeredPlayersIds: ['1', '2'] });
  });

  it('GET /rest-api/tournament-registrations/:tournamentId | when tournament with given if not found', async () => {
    //Given
    const queryPublisher = QueryPublisherMock(undefined);
    const { agent } = testModuleRestApi(TournamentRegistrationsRestApiModule, { queryPublisher });

    //When
    const { body, status } = await agent.get('/rest-api/tournament-registrations/sampleTournamentId2').send();

    //Then
    expect(queryPublisher.executeCalls).toBeCalledWith(new FindTournamentRegistrationsById({ tournamentId: 'sampleTournamentId2' }));
    expect(status).toBe(StatusCodes.NOT_FOUND);
    expect(body).toStrictEqual({ message: 'Tournament registrations with id = sampleTournamentId2 not found!' });
  });
});
