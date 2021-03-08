import { CommandPublisherMock } from '../../../../test-support/shared/core/CommandPublisherMock';
import { CommandResult } from '../../../../../src/shared/core/application/command/CommandResult';
import { testModuleRestApi } from '../../../../test-support/shared/presentation/rest-api/TestModuleRestApi';
import { StartMatch } from '../../../../../src/modules/match-module/core/application/command/StartMatch';
import { StatusCodes } from 'http-status-codes';
import { MatchRestApiModule } from '../../../../../src/modules/match-module/presentation/rest-api/MatchRestApiModule';
import { QueryPublisherMock } from '../../../../test-support/shared/core/QueryPublisherMock';
import { MatchId } from '../../../../../src/modules/match-module/core/domain/MatchId';
import { MatchSideId } from '../../../../../src/modules/match-module/core/domain/MatchSideId';
import { Match } from '../../../../../src/modules/match-module/core/domain/Match';
import { FindMatchById } from '../../../../../src/modules/match-module/core/application/query/FindMatchById';
import { EndMatch } from '../../../../../src/modules/match-module/core/application/command/EndMatch';

describe('Match REST API', () => {
  it('POST /rest-api/matches | when command success', async () => {
    //Given
    const commandPublisher = CommandPublisherMock(CommandResult.success());
    const { agent } = testModuleRestApi(MatchRestApiModule, { commandPublisher });

    //When
    const { body, status } = await agent
      .post('/rest-api/matches')
      .send({ matchId: 'SampleMatchId', firstMatchSideId: 'Team1Id', secondMatchSideId: 'Team2Id' });

    //Then
    expect(commandPublisher.executeCalls).toBeCalledWith(
      new StartMatch({ matchId: 'SampleMatchId', firstMatchSideId: 'Team1Id', secondMatchSideId: 'Team2Id' }),
    );
    expect(status).toBe(StatusCodes.CREATED);
    expect(body).toStrictEqual({ matchId: 'SampleMatchId' });
  });

  it('POST /rest-api/matches | when command fails on attempt to start already started match', async () => {
    //Given
    const commandPublisher = CommandPublisherMock(CommandResult.failureDueTo(new Error('Cannot start a match that has already begun.')));
    const { agent } = testModuleRestApi(MatchRestApiModule, { commandPublisher });

    //When
    const { body, status } = await agent
      .post('/rest-api/matches')
      .send({ matchId: 'SampleMatchId', firstMatchSideId: 'Team1Id', secondMatchSideId: 'Team2Id' });

    //Then
    expect(commandPublisher.executeCalls).toBeCalledWith(
      new StartMatch({ matchId: 'SampleMatchId', firstMatchSideId: 'Team1Id', secondMatchSideId: 'Team2Id' }),
    );
    expect(status).toBe(StatusCodes.BAD_REQUEST);
    expect(body).toStrictEqual({ message: 'Cannot start a match that has already begun.' });
  });

  it('POST /rest-api/matches | when command fails on attempt to start match between teams that have same ids', async () => {
    //Given
    const commandPublisher = CommandPublisherMock(
      CommandResult.failureDueTo(new Error('Cannot start match if opposite teams are the same team.')),
    );
    const { agent } = testModuleRestApi(MatchRestApiModule, { commandPublisher });

    //When
    const { body, status } = await agent
      .post('/rest-api/matches')
      .send({ matchId: 'SampleMatchId', firstMatchSideId: 'Team1Id', secondMatchSideId: 'Team1Id' });

    //Then
    expect(commandPublisher.executeCalls).toBeCalledWith(
      new StartMatch({ matchId: 'SampleMatchId', firstMatchSideId: 'Team1Id', secondMatchSideId: 'Team1Id' }),
    );
    expect(status).toBe(StatusCodes.BAD_REQUEST);
    expect(body).toStrictEqual({ message: 'Cannot start match if opposite teams are the same team.' });
  });

  it('POST /rest-api/matches | when command failure', async () => {
    //Given
    const commandPublisher = CommandPublisherMock(CommandResult.failureDueTo(new Error('MatchSideId cannot be empty.')));
    const { agent } = testModuleRestApi(MatchRestApiModule, { commandPublisher });

    //When
    const { body, status } = await agent
      .post('/rest-api/matches')
      .send({ matchId: 'SampleMatchId', firstMatchSideId: 'Team1Id', secondMatchSideId: '' });

    //Then
    expect(commandPublisher.executeCalls).toBeCalledWith(
      new StartMatch({ matchId: 'SampleMatchId', firstMatchSideId: 'Team1Id', secondMatchSideId: '' }),
    );
    expect(status).toBe(StatusCodes.BAD_REQUEST);
    expect(body).toStrictEqual({ message: 'MatchSideId cannot be empty.' });
  });

  it('GET /rest-api/matches/:matchId | when match with given id was found', async () => {
    //Given
    const queryPublisher = QueryPublisherMock(
      new Match({
        matchId: MatchId.from('sampleMatchId'),
        firstMatchSideId: MatchSideId.from('team1Id'),
        secondMatchSideId: MatchSideId.from('team2Id'),
      }),
    );
    const { agent } = testModuleRestApi(MatchRestApiModule, { queryPublisher });

    //When
    const { body, status } = await agent.get('/rest-api/matches/sampleMatchId').send();

    //Then
    expect(queryPublisher.executeCalls).toBeCalledWith(new FindMatchById({ matchId: 'sampleMatchId' }));
    expect(status).toBe(StatusCodes.OK);
    expect(body).toStrictEqual({ matchId: 'sampleMatchId', firstMatchSideId: 'team1Id', secondMatchSideId: 'team2Id' });
  });

  it('GET /rest-api/matches/:matchId | when match with given id was not found', async () => {
    //Given
    const queryPublisher = QueryPublisherMock(undefined);
    const { agent } = testModuleRestApi(MatchRestApiModule, { queryPublisher });

    //When
    const { body, status } = await agent.get('/rest-api/matches/sampleMatchId').send();

    //Then
    expect(queryPublisher.executeCalls).toBeCalledWith(new FindMatchById({ matchId: 'sampleMatchId' }));
    expect(status).toBe(StatusCodes.NOT_FOUND);
    expect(body).toStrictEqual({ message: 'Match with id = sampleMatchId was not found!' });
  });

  it('POST /rest-api/matches/:matchId/result | when command end match success', async () => {
    //Given
    const commandPublisher = CommandPublisherMock(CommandResult.success());
    const { agent } = testModuleRestApi(MatchRestApiModule, { commandPublisher });

    //When
    const { body, status } = await agent
      .post('/rest-api/matches/sampleMatchId/result')
      .send({ matchId: 'sampleMatchId', winnerId: 'team1Id' });

    //Then
    expect(commandPublisher.executeCalls).toBeCalledWith(new EndMatch({ matchId: 'sampleMatchId', winnerId: 'team1Id' }));
    expect(status).toBe(StatusCodes.OK);
    expect(body).toBeEmpty();
  });

  it('POST /rest-api/matches/:matchId/result | when command end match fails due to wrong id given', async () => {
    //Given
    const commandPublisher = CommandPublisherMock(CommandResult.failureDueTo(new Error("Cannot end match that hasn't started.")));
    const { agent } = testModuleRestApi(MatchRestApiModule, { commandPublisher });

    //When
    const { body, status } = await agent.post('/rest-api/matches/NotStartedMatchId/result').send({ winnerId: 'team1Id' });

    //Then
    expect(commandPublisher.executeCalls).toBeCalledWith(new EndMatch({ matchId: 'NotStartedMatchId', winnerId: 'team1Id' }));
    expect(status).toBe(StatusCodes.BAD_REQUEST);
    expect(body).toStrictEqual({ message: "Cannot end match that hasn't started." });
  });

  it('POST /rest-api/matches/:matchId/result | when command end match fails due to wrong winnerId given', async () => {
    //Given
    const commandPublisher = CommandPublisherMock(
      CommandResult.failureDueTo(new Error('One of the participating teams must be a winner.')),
    );
    const { agent } = testModuleRestApi(MatchRestApiModule, { commandPublisher });

    //When
    const { body, status } = await agent.post('/rest-api/matches/sampleMatchId/result').send({ winnerId: 'IdThatIsNeitherOfTeamsId' });

    //Then
    expect(commandPublisher.executeCalls).toBeCalledWith(new EndMatch({ matchId: 'sampleMatchId', winnerId: 'IdThatIsNeitherOfTeamsId' }));
    expect(status).toBe(StatusCodes.BAD_REQUEST);
    expect(body).toStrictEqual({ message: 'One of the participating teams must be a winner.' });
  });
});
