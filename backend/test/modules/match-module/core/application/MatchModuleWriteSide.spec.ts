import { testMatchModule } from './TestMatchModule';
import { StartMatch } from '../../../../../src/modules/match-module/core/application/command/StartMatch';
import { MatchHasStarted } from '../../../../../src/modules/match-module/core/domain/event/MatchHasStarted';
import { CommandResult } from '../../../../../src/shared/core/application/command/CommandResult';
import Failure = CommandResult.Failure;

describe('Match Module | Write Side', () => {
  it('given 2 teams, when start match, then match was started', async () => {
    //Given
    const currentTime = new Date();
    const matchModule = testMatchModule(currentTime);

    const matchId = 'matchId';
    const firstTeamId = 'Team1';
    const secondTeamId = 'Team2';

    //When
    const startMatch = new StartMatch({ matchId, firstTeamId, secondTeamId });
    const commandResult = await matchModule.executeCommand(startMatch);

    //Then
    expect(commandResult.isSuccess()).toBeTruthy();
    expect(matchModule.lastPublishedEvent()).toStrictEqual(
      new MatchHasStarted({
        occurredAt: currentTime,
        matchId: matchId,
        firstTeamId: firstTeamId,
        secondTeamId: secondTeamId,
      }),
    );
  });

  it('given 1 team, when start match, command should fail', async () => {
    //Given
    const currentTime = new Date();
    const matchModule = testMatchModule(currentTime);

    const matchId = 'matchId';
    const firstTeamId = 'Team1';
    const secondTeamId = '';

    //When
    const startMatch = new StartMatch({ matchId, firstTeamId, secondTeamId });
    const commandResult = await matchModule.executeCommand(startMatch);

    //Then
    expect(commandResult.isSuccess()).toBeFalsy();
    expect((commandResult as Failure).reason).toStrictEqual(new Error('Two teams are needed for match to start.'));
  });

  it('given no teams, when start match, command should fail', async () => {
    //Given
    const currentTime = new Date();
    const matchModule = testMatchModule(currentTime);

    const matchId = 'matchId';
    const firstTeamId = '';
    const secondTeamId = '';

    //When
    const startMatch = new StartMatch({ matchId, firstTeamId, secondTeamId });
    const commandResult = await matchModule.executeCommand(startMatch);

    //Then
    expect(commandResult.isSuccess()).toBeFalsy();
    expect((commandResult as Failure).reason).toStrictEqual(new Error('Two teams are needed for match to start.'));
  });

  it('given started match id, when attempt to start match with this id, command should fail', async () => {
    //Given
    const currentTime = new Date();
    const matchModule = testMatchModule(currentTime);

    const matchId = 'matchId';
    const firstTeamId = 'Team1';
    const secondTeamId = 'Team2';
    const startMatch = new StartMatch({ matchId, firstTeamId, secondTeamId });
    await matchModule.executeCommand(startMatch);

    //When
    const commandResult = await matchModule.executeCommand(startMatch);

    //Then
    expect(commandResult.isSuccess()).toBeFalsy();
    expect((commandResult as Failure).reason).toStrictEqual(new Error('Cannot start a match that has already begun.'));
  });
});
