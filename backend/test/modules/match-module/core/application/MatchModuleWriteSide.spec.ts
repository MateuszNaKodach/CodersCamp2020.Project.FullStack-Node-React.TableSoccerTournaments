import { testMatchModule } from './TestMatchModule';
import { StartMatch } from '../../../../../src/modules/match-module/core/application/command/StartMatch';
import { MatchHasStarted } from '../../../../../src/modules/match-module/core/domain/event/MatchHasStarted';
import { CommandResult } from '../../../../../src/shared/core/application/command/CommandResult';
import Failure = CommandResult.Failure;
import {MatchId} from "../../../../../src/modules/match-module/core/domain/MatchId";
import {MatchSideId} from "../../../../../src/modules/match-module/core/domain/MatchSideId";

describe('Match Module | Write Side', () => {
  it('given 2 teams, when start match, then match was started', async () => {
    //Given
    const currentTime = new Date();
    const matchModule = testMatchModule(currentTime);

    const matchId = 'matchId';
    const firstTeamId = 'Team1';
    const secondTeamId = 'Team2';

    //When
    const startMatch = new StartMatch(matchId, firstTeamId, secondTeamId);
    const commandResult = await matchModule.executeCommand(startMatch);

    //Then
    expect(commandResult.isSuccess()).toBeTruthy();
    expect(matchModule.lastPublishedEvent()).toStrictEqual(
      new MatchHasStarted({ occurredAt: currentTime, matchId: MatchId.from(matchId), firstTeamId: MatchSideId.from(firstTeamId), secondTeamId: MatchSideId.from(secondTeamId) }),
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
    const startMatch = new StartMatch(matchId, firstTeamId, secondTeamId);
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
    const startMatch = new StartMatch(matchId, firstTeamId, secondTeamId);
    const commandResult = await matchModule.executeCommand(startMatch);

    //Then
    expect(commandResult.isSuccess()).toBeFalsy();
    expect((commandResult as Failure).reason).toStrictEqual(new Error('Two teams are needed for match to start.'));
  });
});
