import { testMatchModule } from './TestMatchModule';
import { StartMatch } from '../../../../../src/modules/match-module/core/application/command/StartMatch';
import { MatchHasStarted } from '../../../../../src/modules/match-module/core/domain/event/MatchHasStarted';
import { CommandResult } from '../../../../../src/shared/core/application/command/CommandResult';
import Failure = CommandResult.Failure;
import { EndMatch } from '../../../../../src/modules/match-module/core/application/command/EndMatch';
import { MatchHasEnded } from '../../../../../src/modules/match-module/core/domain/event/MatchHasEnded';

describe('Match Module | Write Side', () => {
  it('given 2 teams, when start match, then match was started', async () => {
    //Given
    const currentTime = new Date();
    const matchModule = testMatchModule(currentTime);

    const matchId = 'matchId';
    const firstMatchSideId = 'Team1';
    const secondMatchSideId = 'Team2';

    //When
    const startMatch = new StartMatch({ matchId, firstMatchSideId, secondMatchSideId });
    const commandResult = await matchModule.executeCommand(startMatch);

    //Then
    expect(commandResult.isSuccess()).toBeTruthy();
    expect(matchModule.lastPublishedEvent()).toStrictEqual(
      new MatchHasStarted({
        occurredAt: currentTime,
        matchId: matchId,
        firstMatchSideId,
        secondMatchSideId,
      }),
    );
  });

  it('given only 1 team id, when start match, command should fail', async () => {
    //Given
    const currentTime = new Date();
    const matchModule = testMatchModule(currentTime);

    const matchId = 'matchId';
    const firstMatchSideId = 'Team1';
    const secondMatchSideId = '';

    //When
    const startMatch = new StartMatch({ matchId, firstMatchSideId, secondMatchSideId });
    const commandResult = await matchModule.executeCommand(startMatch);

    //Then
    expect(commandResult.isSuccess()).toBeFalsy();
    expect((commandResult as Failure).reason).toStrictEqual(new Error('MatchSideId cannot be empty!'));
  });

  it('given no teams ids, when start match, command should fail', async () => {
    //Given
    const currentTime = new Date();
    const matchModule = testMatchModule(currentTime);

    const matchId = 'matchId';
    const firstMatchSideId = '';
    const secondMatchSideId = '';

    //When
    const startMatch = new StartMatch({ matchId, firstMatchSideId, secondMatchSideId });
    const commandResult = await matchModule.executeCommand(startMatch);

    //Then
    expect(commandResult.isSuccess()).toBeFalsy();
    expect((commandResult as Failure).reason).toStrictEqual(new Error('MatchSideId cannot be empty!'));
  });

  it('given started match id, when attempt to start match with this id, command should fail', async () => {
    //Given
    const currentTime = new Date();
    const matchModule = testMatchModule(currentTime);

    const matchId = 'matchId';
    const firstMatchSideId = 'Team1';
    const secondMatchSideId = 'Team2';
    const startMatch = new StartMatch({ matchId, firstMatchSideId, secondMatchSideId });
    await matchModule.executeCommand(startMatch);

    //When
    const commandResult = await matchModule.executeCommand(startMatch);

    //Then
    expect(commandResult.isSuccess()).toBeFalsy();
    expect((commandResult as Failure).reason).toStrictEqual(new Error('Cannot start a match that has already begun.'));
  });

  it('given two teams with same id, when attempt to start match, command should fail', async () => {
    const currentTime = new Date();
    const matchModule = testMatchModule(currentTime);

    const matchId = 'matchId';
    const firstMatchSideId = 'Team1';
    const secondMatchSideId = 'Team1';

    //When
    const startMatch = new StartMatch({ matchId, firstMatchSideId, secondMatchSideId });
    const commandResult = await matchModule.executeCommand(startMatch);

    //Then
    expect(commandResult.isSuccess()).toBeFalsy();
    expect((commandResult as Failure).reason).toStrictEqual(new Error('Cannot start match if opposite teams are the same team.'));
  });

  it('given started match id and its winner, when end match, then the match was ended', async () => {
    //Given
    const currentTime = new Date();
    const matchModule = testMatchModule(currentTime);

    const matchId = 'matchId';
    const winner = 'Team1';

    const firstMatchSideId = 'Team1';
    const secondMatchSideId = 'Team2';
    const startMatch = new StartMatch({ matchId, firstMatchSideId, secondMatchSideId });
    await matchModule.executeCommand(startMatch);

    //When
    const endMatch = new EndMatch({ matchId, winner });
    const commandResult = await matchModule.executeCommand(endMatch);

    //Then
    expect(commandResult.isSuccess()).toBeTruthy();
    expect(matchModule.lastPublishedEvent()).toStrictEqual(
      new MatchHasEnded({
        occurredAt: currentTime,
        matchId,
        winner,
        looser: 'Team2',
      }),
    );
  });

  it('given started match id and wrong winner id, when attempt to end match, command should fail', async () => {
    //Given
    const currentTime = new Date();
    const matchModule = testMatchModule(currentTime);

    const matchId = 'matchId';
    const winner = 'OtherTeam';

    const firstMatchSideId = 'Team1';
    const secondMatchSideId = 'Team2';
    const startMatch = new StartMatch({ matchId, firstMatchSideId, secondMatchSideId });
    await matchModule.executeCommand(startMatch);

    //When
    const endMatch = new EndMatch({ matchId, winner });
    const commandResult = await matchModule.executeCommand(endMatch);

    //Then
    expect(commandResult.isSuccess()).toBeFalsy();
    expect((commandResult as Failure).reason).toStrictEqual(new Error('One of the participating teams must be a winner.'));
  });

  it('given no started match, when end match, then command should fail', async () => {
    //Given
    const currentTime = new Date();
    const matchModule = testMatchModule(currentTime);

    const matchId = 'matchId';
    const winner = 'Team';

    //When
    const endMatch = new EndMatch({ matchId, winner });
    const commandResult = await matchModule.executeCommand(endMatch);

    //Then
    expect(commandResult.isSuccess()).toBeFalsy();
    expect((commandResult as Failure).reason).toStrictEqual(new Error("Cannot end match that hasn't started."));
  });
});
