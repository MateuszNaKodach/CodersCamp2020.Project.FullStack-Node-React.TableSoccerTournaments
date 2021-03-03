import { testMatchModule } from './TestMatchModule';
import { FindAllMatches, FindAllMatchesResult } from '../../../../../src/modules/match-module/core/application/query/FindAllMatches';
import { StartMatch } from '../../../../../src/modules/match-module/core/application/command/StartMatch';
import { Match } from '../../../../../src/modules/match-module/core/domain/Match';
import { MatchSideId } from '../../../../../src/modules/match-module/core/domain/MatchSideId';
import { MatchId } from '../../../../../src/modules/match-module/core/domain/MatchId';
import { FindMatchById, FindMatchByIdResult } from '../../../../../src/modules/match-module/core/application/query/FindMatchById';

describe('Match Module | Query Side', () => {
  it('FindAllMatchesResult | No matches was started', async () => {
    //Given
    const currentTime = new Date();
    const matchModule = testMatchModule(currentTime);

    //When
    const findAllMatchesResult = await matchModule.executeQuery<FindAllMatchesResult>(new FindAllMatches());

    //Then
    expect(findAllMatchesResult).toBeEmpty();
  });

  it('FindAllMatchesResult | Two matches has started', async () => {
    //Given
    const currentTime = new Date();
    const matchModule = testMatchModule(currentTime);

    const matchId1 = 'MatchId1';
    const team1 = 'Team1';
    const team2 = 'Team2';

    const matchId2 = 'MatchId2';
    const team3 = 'Team3';
    const team4 = 'Team4';

    const startMatch1 = new StartMatch({ matchId: matchId1, firstTeamId: team1, secondTeamId: team2 });
    await matchModule.executeCommand(startMatch1);

    const startMatch2 = new StartMatch({ matchId: matchId2, firstTeamId: team3, secondTeamId: team4 });
    await matchModule.executeCommand(startMatch2);

    //When
    const findAllMatchesResult = await matchModule.executeQuery<FindAllMatchesResult>(new FindAllMatches());

    //Then
    expect(findAllMatchesResult).toIncludeSameMembers([
      new Match({
        matchId: MatchId.from(matchId1),
        firstTeamId: MatchSideId.from(team1),
        secondTeamId: MatchSideId.from(team2),
      }),
      new Match({
        matchId: MatchId.from(matchId2),
        firstTeamId: MatchSideId.from(team3),
        secondTeamId: MatchSideId.from(team4),
      }),
    ]);
  });

  it('FindMatchById | Match id exists', async () => {
    //Given
    const currentTime = new Date();
    const matchModule = testMatchModule(currentTime);

    const matchId = 'MatchId';
    const team1 = 'Team1';
    const team2 = 'Team2';

    const startMatch = new StartMatch({ matchId: matchId, firstTeamId: team1, secondTeamId: team2 });
    await matchModule.executeCommand(startMatch);

    //When
    const findMatchByIdResult = await matchModule.executeQuery<FindMatchByIdResult>(new FindMatchById({ matchId }));

    //Then
    expect(findMatchByIdResult).toStrictEqual(
      new Match({
        matchId: MatchId.from(matchId),
        firstTeamId: MatchSideId.from(team1),
        secondTeamId: MatchSideId.from(team2),
      }),
    );
  });

  it('FindMatchById | Match id does not exist', async () => {
    //Given
    const currentTime = new Date();
    const matchModule = testMatchModule(currentTime);

    const matchId = 'MatchId';

    //When
    const findMatchByIdResult = await matchModule.executeQuery<FindMatchByIdResult>(new FindMatchById({ matchId }));

    //Then
    expect(findMatchByIdResult).toBeUndefined();
  });
});
