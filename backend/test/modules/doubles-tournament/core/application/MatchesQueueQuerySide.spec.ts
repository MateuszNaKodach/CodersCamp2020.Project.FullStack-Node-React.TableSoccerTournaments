import { TestModuleCore } from '../../../../test-support/shared/core/TestModuleCore';
import { createTournamentForTests } from './TestDoublesTournamentModuleWithTournament';
import { FindMatchesQueueByTournamentId } from '../../../../../src/modules/doubles-tournament/core/application/query/FindMatchesQueueByTournamentId';
import { EnqueueMatch } from '../../../../../src/modules/doubles-tournament/core/application/command/EnqueueMatch';
import { MatchesQueue } from '../../../../../src/modules/doubles-tournament/core/domain/MatchesQueue';
import { TournamentId } from '../../../../../src/modules/doubles-tournament/core/domain/TournamentId';
import { QueuedMatch } from '../../../../../src/modules/doubles-tournament/core/domain/QueuedMatch';
import { TeamId } from '../../../../../src/modules/doubles-tournament/core/domain/TeamId';
import { MatchNumber } from '../../../../../src/modules/doubles-tournament/core/domain/MatchNumber';

describe('Matches queue | Query Side', () => {
  const tournamentId = 'TournamentId';
  const currentTime = new Date();
  const team1Id = 'Team1Id';
  const team2Id = 'Team2Id';
  const matchNumber = 1;
  const team1Id_2 = 'Team1Id_2';
  const team2Id_2 = 'Team2Id_2';
  const matchNumber_2 = 2;
  let doublesTournament: TestModuleCore;
  const enqueueMatch = new EnqueueMatch({
    tournamentId: tournamentId,
    matchNumber: matchNumber,
    team1Id: team1Id,
    team2Id: team2Id,
  });
  const enqueueMatch2 = new EnqueueMatch({
    tournamentId: tournamentId,
    matchNumber: matchNumber_2,
    team1Id: team1Id_2,
    team2Id: team2Id_2,
  });

  beforeEach(() => {
    doublesTournament = createTournamentForTests(tournamentId, currentTime, team1Id, team2Id);
  });

  it('FindMatchesQueueByTournamentId | match was added to queue - get the queue', async () => {
    //Given
    await doublesTournament.executeCommand(enqueueMatch);

    //When
    const findMatchesQueueByTournamentByIdResult = await doublesTournament.executeQuery<FindMatchesQueueByTournamentId>(
      new FindMatchesQueueByTournamentId({ tournamentId }),
    );

    //Then
    const queue: QueuedMatch[] = [
      new QueuedMatch({ matchNumber: MatchNumber.from(matchNumber), team1Id: TeamId.from(team1Id), team2Id: TeamId.from(team2Id) }),
    ];
    const matchesQueue = new MatchesQueue({
      tournamentId: TournamentId.from(tournamentId),
      queuedMatches: queue,
    });
    expect(findMatchesQueueByTournamentByIdResult).toStrictEqual(matchesQueue);
    expect(matchesQueue.queuedMatches.length).toBe(1);
  });

  it('FindMatchesQueueByTournamentId | 2 matches was added to queue - get the queue', async () => {
    //Given
    await doublesTournament.executeCommand(enqueueMatch);
    await doublesTournament.executeCommand(enqueueMatch2);

    //When
    const findMatchesQueueByTournamentByIdResult = await doublesTournament.executeQuery<FindMatchesQueueByTournamentId>(
      new FindMatchesQueueByTournamentId({ tournamentId }),
    );

    //Then
    const queue: QueuedMatch[] = [
      new QueuedMatch({ matchNumber: MatchNumber.from(matchNumber), team1Id: TeamId.from(team1Id), team2Id: TeamId.from(team2Id) }),
      new QueuedMatch({ matchNumber: MatchNumber.from(matchNumber_2), team1Id: TeamId.from(team1Id_2), team2Id: TeamId.from(team2Id_2) }),
    ];
    const matchesQueue = new MatchesQueue({
      tournamentId: TournamentId.from(tournamentId),
      queuedMatches: queue,
    });
    expect(findMatchesQueueByTournamentByIdResult).toStrictEqual(matchesQueue);
    expect(matchesQueue.queuedMatches.length).toBe(2);
  });

  it('FindMatchesQueueByTournamentId | no match was added - get undefined', async () => {
    //Given

    //When
    const findMatchesQueueByTournamentByIdResult = await doublesTournament.executeQuery<FindMatchesQueueByTournamentId>(
      new FindMatchesQueueByTournamentId({ tournamentId }),
    );

    //Then
    expect(findMatchesQueueByTournamentByIdResult).toBeUndefined();
  });
});
