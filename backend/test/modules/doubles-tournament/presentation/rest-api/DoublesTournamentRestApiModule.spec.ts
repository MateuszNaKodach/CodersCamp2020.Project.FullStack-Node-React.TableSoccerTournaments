import { QueryPublisherMock } from '../../../../test-support/shared/core/QueryPublisherMock';
import { DoublesTournament } from '../../../../../src/modules/doubles-tournament/core/domain/DoublesTournament';
import { TournamentTeam } from '../../../../../src/modules/doubles-tournament/core/domain/TournamentTeam';
import { TeamId } from '../../../../../src/modules/doubles-tournament/core/domain/TeamId';
import { testModuleRestApi } from '../../../../test-support/shared/presentation/rest-api/TestModuleRestApi';
import { DoublesTournamentRestApiModule } from '../../../../../src/modules/doubles-tournament/presentation/rest-api/DoublesTournamentRestApiModule';
import { FindDoublesTournamentById } from '../../../../../src/modules/doubles-tournament/core/application/query/FindDoublesTournamentById';
import { StatusCodes } from 'http-status-codes';
import { FindTournamentRegistrationsById } from '../../../../../src/modules/tournaments-registrations/core/application/query/FindTournamentRegistrationsById';
import { FindMatchesQueueByTournamentId } from '../../../../../src/modules/doubles-tournament/core/application/query/FindMatchesQueueByTournamentId';
import { QueuedMatch } from '../../../../../src/modules/doubles-tournament/core/domain/QueuedMatch';
import { MatchNumber } from '../../../../../src/modules/doubles-tournament/core/domain/MatchNumber';
import { MatchesQueue } from '../../../../../src/modules/doubles-tournament/core/domain/MatchesQueue';
import { TournamentId } from '../../../../../src/modules/doubles-tournament/core/domain/TournamentId';

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

  it('GET /rest-api/doubles-tournaments/:tournamentId/matches | when queue under correct tournament id was found', async () => {
    //Given
    const queue: QueuedMatch[] = [
      new QueuedMatch({
        matchNumber: MatchNumber.from(1),
        team1Id: TeamId.from('sampleTeam1'),
        team2Id: TeamId.from('sampleTeam2'),
        tableNumber: 3,
        started: true,
      }),
      new QueuedMatch({
        matchNumber: MatchNumber.from(2),
        team1Id: TeamId.from('sampleTeam3'),
        team2Id: TeamId.from('sampleTeam4'),
      }),
    ];
    const matchesQueue = new MatchesQueue({
      tournamentId: TournamentId.from('sampleTournamentId'),
      queuedMatches: queue,
    });

    const queryPublisher = QueryPublisherMock(matchesQueue);
    const { agent } = testModuleRestApi(DoublesTournamentRestApiModule, { queryPublisher });

    //When
    const { body, status } = await agent.get('/rest-api/doubles-tournaments/sampleTournamentId/matches').send();

    //Then
    expect(queryPublisher.executeCalls).toBeCalledWith(new FindMatchesQueueByTournamentId({ tournamentId: 'sampleTournamentId' }));
    expect(status).toBe(StatusCodes.OK);
    expect(body).toStrictEqual({
      tournamentId: 'sampleTournamentId',
      queue: [
        {
          matchNumber: 1,
          team1Id: 'sampleTeam1',
          team2Id: 'sampleTeam2',
          tableNumber: 3,
          started: true,
        },
        {
          matchNumber: 2,
          team1Id: 'sampleTeam3',
          team2Id: 'sampleTeam4',
          started: false,
        },
      ],
    });
  });

  it("GET /rest-api/doubles-tournaments/:tournamentId/matches | when tournament with given id doesn't exist", async () => {
    //Given
    const queryPublisher = QueryPublisherMock(undefined);
    const { agent } = testModuleRestApi(DoublesTournamentRestApiModule, { queryPublisher });

    //When
    const { body, status } = await agent.get('/rest-api/doubles-tournaments/sampleTournamentId/matches').send();

    //Then
    expect(queryPublisher.executeCalls).toBeCalledWith(new FindMatchesQueueByTournamentId({ tournamentId: 'sampleTournamentId' }));
    expect(status).toBe(StatusCodes.NOT_FOUND);
    expect(body).toStrictEqual({
      message: "Such Matches queue doesn't exist because doubles tournament with id = sampleTournamentId is not found!",
    });
  });
});
