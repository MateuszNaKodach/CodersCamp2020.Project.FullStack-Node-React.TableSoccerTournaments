import { CommandPublisherMock } from '../../../../test-support/shared/core/CommandPublisherMock';
import { CommandResult } from '../../../../../src/shared/core/application/command/CommandResult';
import { testModuleRestApi } from '../../../../test-support/shared/presentation/rest-api/TestModuleRestApi';
import { StartMatch } from '../../../../../src/modules/match-module/core/application/command/StartMatch';
import { StatusCodes } from 'http-status-codes';
import { MatchRestApiModule } from '../../../../../src/modules/match-module/presentation/rest-api/MatchRestApiModule';

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
    expect(body).toStrictEqual({ matchId: 'SampleMatchId', firstMatchSideId: 'Team1Id', secondMatchSideId: 'Team2Id' });
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
});
