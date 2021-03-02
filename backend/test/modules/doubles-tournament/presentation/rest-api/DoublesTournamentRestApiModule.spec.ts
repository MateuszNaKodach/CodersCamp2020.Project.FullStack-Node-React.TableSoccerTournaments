import { QueryPublisherMock } from '../../../../test-support/shared/core/QueryPublisherMock';
import { DoublesTournament } from '../../../../../src/modules/doubles-tournament/core/domain/DoublesTournament';
import { TournamentTeam } from '../../../../../src/modules/doubles-tournament/core/domain/TournamentTeam';
import { TeamId } from '../../../../../src/modules/doubles-tournament/core/domain/TeamId';
import { testModuleRestApi } from '../../../../test-support/shared/presentation/rest-api/TestModuleRestApi';
import { DoublesTournamentRestApiModule } from '../../../../../src/modules/doubles-tournament/core/presentation/rest-api/DoublesTournamentRestApiModule';
import { FindDoublesTournamentById } from '../../../../../src/modules/doubles-tournament/core/application/query/FindDoublesTournamentById';
import { StatusCodes } from 'http-status-codes';
import { FindTournamentRegistrationsById } from '../../../../../src/modules/tournaments-registrations/core/application/query/FindTournamentRegistrationsById';

describe('Doubles Tournament REST API', () => {
  it('GET /rest-api/doubles-tournaments/:tournamentId/teams | when tournament with given id found', async () => {
    //Given
    const queryPublisher = QueryPublisherMock(
      new DoublesTournament({
        tournamentId: 'sampleTournamentId',
        tournamentTeams: [
          new TournamentTeam({
            teamId: TeamId.from('sampleTeamId1'),
            firstTeamPlayer: 'samplePlayer1',
            secondTeamPlayer: 'samplePlayer2',
          }),
          new TournamentTeam({
            teamId: TeamId.from('sampleTeamId2'),
            firstTeamPlayer: 'samplePlayer3',
            secondTeamPlayer: 'samplePlayer4',
          }),
        ],
      }),
    );
    const { agent } = testModuleRestApi(DoublesTournamentRestApiModule, { queryPublisher });

    //When
    const { body, status } = await agent.get('/rest-api/doubles-tournaments/sampleTournamentId/teams').send();

    //Then
    expect(queryPublisher.executeCalls).toBeCalledWith(new FindDoublesTournamentById({ tournamentId: 'sampleTournamentId' }));
    expect(status).toBe(StatusCodes.OK);
    expect(body).toStrictEqual({
      items: [
        { teamId: 'sampleTeamId1', firstTeamPlayer: 'samplePlayer1', secondTeamPlayer: 'samplePlayer2' },
        { teamId: 'sampleTeamId2', firstTeamPlayer: 'samplePlayer3', secondTeamPlayer: 'samplePlayer4' },
      ],
    });
  });

  it('GET /rest-api/doubles-tournaments/:tournamentId/teams | when tournament with given id not found', async () => {
    //Given
    const queryPublisher = QueryPublisherMock(undefined);
    const { agent } = testModuleRestApi(DoublesTournamentRestApiModule, { queryPublisher });

    //When
    const { body, status } = await agent.get('/rest-api/doubles-tournaments/sampleTournamentId/teams').send();

    //Then
    expect(queryPublisher.executeCalls).toBeCalledWith(new FindTournamentRegistrationsById({ tournamentId: 'sampleTournamentId' }));
    expect(status).toBe(StatusCodes.NOT_FOUND);
    expect(body).toStrictEqual({ message: 'Doubles tournament with id = sampleTournamentId not found!' });
  });
});
