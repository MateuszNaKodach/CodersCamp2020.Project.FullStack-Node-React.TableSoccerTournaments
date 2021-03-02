import { testMatchModule } from './TestMatchModule';
import { StartMatch } from '../../../../../src/modules/match-module/core/application/command/StartMatch';
import { MatchHasStarted } from '../../../../../src/modules/match-module/core/domain/event/MatchHasStarted';

describe('Match Module | Write Side', () => {
  it('given 2 teams, when start match, then match was started', async () => {
    //Given
    const currentTime = new Date();
    const matchModule = testMatchModule(currentTime);

    const matchId = 'matchId';
    const team1 = 'Team1';
    const team2 = 'Team2';

    //When
    const startMatch = new StartMatch(matchId, team1, team2);
    const commandResult = await matchModule.executeCommand(startMatch);

    //Then
    expect(commandResult.isSuccess()).toBeTruthy();
    expect(matchModule.lastPublishedEvent()).toStrictEqual(new MatchHasStarted({ occurredAt: currentTime, matchId, team1, team2 }));
  });
});
