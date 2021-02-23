import { testModuleRestApi } from "../../../../test-support/shared/presentation/rest-api/TestModuleRestApi";
import { TournamentRegistrationsRestApiModule } from "../../../../../src/modules/tournaments-registrations/presentation/rest-api/TournamentRegistrationsRestApiModule";
import { StatusCodes } from "http-status-codes";
import { CommandPublisherMock } from "../../../../test-support/shared/core/CommandPublisherMock";
import { CommandResult } from "../../../../../src/shared/core/application/command/CommandResult";
import { OpenTournamentRegistrations } from "../../../../../src/modules/tournaments-registrations/core/application/command/OpenTournamentRegistrations";
import { RegisterPlayerForTournament } from "../../../../../src/modules/tournaments-registrations/core/application/command/RegisterPlayerForTournament";

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
});
