import { testMatchModule } from './TestMatchModule';
import { FindAllMatches, FindAllMatchesResult } from '../../../../../src/modules/match-module/core/application/query/FindAllMatches';
import { StartMatch } from '../../../../../src/modules/match-module/core/application/command/StartMatch';
import { Match } from '../../../../../src/modules/match-module/core/domain/Match';
import { MatchSideId } from '../../../../../src/modules/match-module/core/domain/MatchSideId';
import { MatchId } from '../../../../../src/modules/match-module/core/domain/MatchId';
import { FindMatchById, FindMatchByIdResult } from '../../../../../src/modules/match-module/core/application/query/FindMatchById';
import {EndMatch} from "../../../../../src/modules/match-module/core/application/command/EndMatch";

describe('Match Module | Query Side', () => {
  it('FindAllMatchesResult | No matches were started', async () => {
    //Given
    const currentTime = new Date();
    const matchModule = testMatchModule(currentTime);

    //When
    const findAllMatchesResult = await matchModule.executeQuery<FindAllMatchesResult>(new FindAllMatches());

    //Then
    expect(findAllMatchesResult).toBeEmpty();
  });

  it('FindAllMatchesResult | Two matches were started', async () => {
    //Given
    const currentTime = new Date();
    const matchModule = testMatchModule(currentTime);

    const matchId1 = 'MatchId1';
    const team1 = 'Team1';
    const team2 = 'Team2';

    const matchId2 = 'MatchId2';
    const team3 = 'Team3';
    const team4 = 'Team4';

    const startMatch1 = new StartMatch({ matchId: matchId1, firstMatchSideId: team1, secondMatchSideId: team2 });
    await matchModule.executeCommand(startMatch1);

    const startMatch2 = new StartMatch({ matchId: matchId2, firstMatchSideId: team3, secondMatchSideId: team4 });
    await matchModule.executeCommand(startMatch2);

    //When
    const findAllMatchesResult = await matchModule.executeQuery<FindAllMatchesResult>(new FindAllMatches());

    //Then
    expect(findAllMatchesResult).toIncludeSameMembers([
      new Match({
        matchId: MatchId.from(matchId1),
        firstMatchSideId: MatchSideId.from(team1),
        secondMatchSideId: MatchSideId.from(team2),
      }),
      new Match({
        matchId: MatchId.from(matchId2),
        firstMatchSideId: MatchSideId.from(team3),
        secondMatchSideId: MatchSideId.from(team4),
      }),
    ]);
  });

  it('FindMatchById | Started match id exists', async () => {
    //Given
    const currentTime = new Date();
    const matchModule = testMatchModule(currentTime);

    const matchId = 'MatchId';
    const team1 = 'Team1';
    const team2 = 'Team2';

    const startMatch = new StartMatch({ matchId: matchId, firstMatchSideId: team1, secondMatchSideId: team2 });
    await matchModule.executeCommand(startMatch);

    //When
    const findMatchByIdResult = await matchModule.executeQuery<FindMatchByIdResult>(new FindMatchById({ matchId }));

    //Then
    expect(findMatchByIdResult).toStrictEqual(
      new Match({
        matchId: MatchId.from(matchId),
        firstMatchSideId: MatchSideId.from(team1),
        secondMatchSideId: MatchSideId.from(team2),
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

  it('FindMatchById | Match was started and then ended', async () => {
    //Given
    const currentTime = new Date();
    const matchModule = testMatchModule(currentTime);

    const matchId = 'MatchId';
    const team1 = 'Team1';
    const team2 = 'Team2';
    const winner = 'Team1';

    const startMatch = new StartMatch({ matchId: matchId, firstMatchSideId: team1, secondMatchSideId: team2 });
    await matchModule.executeCommand(startMatch);

    const endMatch = new EndMatch({ matchId: matchId, winner });
    await matchModule.executeCommand(endMatch);

    //When
    const findMatchByIdResult = await matchModule.executeQuery<FindMatchByIdResult>(new FindMatchById({ matchId }));

    //Then
    expect(findMatchByIdResult).toStrictEqual(
        new Match({
          matchId: MatchId.from(matchId),
          firstMatchSideId: MatchSideId.from(team1),
          secondMatchSideId: MatchSideId.from(team2),
          winner: MatchSideId.from(winner),
        }),
    );
  });
});
