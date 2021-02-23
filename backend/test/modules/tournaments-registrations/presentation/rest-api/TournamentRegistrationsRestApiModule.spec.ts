import { testModuleRestApi } from "../../../../test-support/shared/presentation/rest-api/TestModuleRestApi";
import { TournamentRegistrationsRestApiModule } from "../../../../../src/modules/tournaments-registrations/presentation/rest-api/TournamentRegistrationsRestApiModule";
import { StatusCodes } from "http-status-codes";
import { CommandPublisherMock } from "../../../../test-support/shared/core/CommandPublisherMock";
import { CommandResult } from "../../../../../src/shared/core/application/command/CommandResult";
import { OpenTournamentRegistrations } from "../../../../../src/modules/tournaments-registrations/core/application/command/OpenTournamentRegistrations";

describe('Tournament Registrations REST API | Endpoint /rest-api/tournament-registrations', () => {
  it('POST when command success', async () => {
    //Given
    const commandPublisher = CommandPublisherMock(CommandResult.success());
    const { agent } = testModuleRestApi(TournamentRegistrationsRestApiModule, { commandPublisher });

    //When
    const { body, status } = await agent.post('/rest-api/tournament-registrations').send();

    //Then
    expect(status).toBe(StatusCodes.CREATED);
    expect(body).toBeEmpty();
    expect(commandPublisher.executeCalls).toBeCalledWith(new OpenTournamentRegistrations({ tournamentId: 'StubEntityId' }));
  });

  it('POST when command failure', async () => {
    //Given
    const commandPublisher = CommandPublisherMock(CommandResult.failureDueTo(new Error('Registrations was opened before!')));
    const { agent } = testModuleRestApi(TournamentRegistrationsRestApiModule, { commandPublisher });

    //When
    const { body, status } = await agent.post('/rest-api/tournament-registrations').send();

    //Then
    expect(status).toBe(StatusCodes.BAD_REQUEST);
    expect(body).toStrictEqual({ message: 'Registrations was opened before!' });
    expect(commandPublisher.executeCalls).toBeCalledWith(new OpenTournamentRegistrations({ tournamentId: 'StubEntityId' }));
  });
});
