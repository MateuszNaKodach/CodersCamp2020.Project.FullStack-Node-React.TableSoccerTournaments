import { EnqueueMatch } from '../../../../../src/modules/doubles-tournament/core/application/command/EnqueueMatch';
import { TestModuleCore } from '../../../../test-support/shared/core/TestModuleCore';
import { MatchWasQueued } from '../../../../../src/modules/doubles-tournament/core/domain/event/MatchWasQueued';
import { CommandResult } from '../../../../../src/shared/core/application/command/CommandResult';
import Failure = CommandResult.Failure;
import { createTournamentForTests } from './TestDoublesTournamentModuleWithTournament';

describe('Matches queue | Write Side', () => {
  const tournamentId = 'TournamentId';
  const currentTime = new Date();
  const team1Id = 'Team1Id';
  const team2Id = 'Team2Id';
  const matchNumber = 1;
  let doublesTournament: TestModuleCore;

  beforeEach(() => {
    doublesTournament = createTournamentForTests(tournamentId, currentTime, team1Id, team2Id);
  });

  it('when enqueue the match, then event - MatchWasQueued should be called with appropriate parameters', async () => {
    //Given

    //When
    const enqueueMatch = new EnqueueMatch({
      tournamentId: tournamentId,
      matchNumber: matchNumber,
      team1Id: team1Id,
      team2Id: team2Id,
    });
    const commandResult = await doublesTournament.executeCommand(enqueueMatch);

    //Then
    expect(commandResult.isSuccess()).toBeTruthy();
    expect(doublesTournament.lastPublishedEvent()).toStrictEqual(
      new MatchWasQueued({
        occurredAt: currentTime,
        tournamentId: tournamentId,
        matchNumber: matchNumber,
        team1Id: team1Id,
        team2Id: team2Id,
      }),
    );
  });

  it('when enqueue the same match again, then an error should appear', async () => {
    //Given
    const enqueueMatch = new EnqueueMatch({
      tournamentId: tournamentId,
      matchNumber: matchNumber,
      team1Id: team1Id,
      team2Id: team2Id,
    });
    await doublesTournament.executeCommand(enqueueMatch);

    //When
    const enqueueMatch2 = new EnqueueMatch({
      tournamentId: tournamentId,
      matchNumber: matchNumber,
      team1Id: team1Id,
      team2Id: team2Id,
    });
    const commandResult = await doublesTournament.executeCommand(enqueueMatch2);

    //Then
    expect(commandResult.isSuccess()).toBeFalsy();
    expect((commandResult as Failure).reason).toStrictEqual(new Error('Such match is already waiting in matches queue!'));
  });

  it('when enqueue the match with wrong tournament id, then an error should appear', async () => {
    //Given

    //When
    const enqueueMatch = new EnqueueMatch({
      tournamentId: 'wrongId',
      matchNumber: matchNumber,
      team1Id: team1Id,
      team2Id: team2Id,
    });
    const commandResult = await doublesTournament.executeCommand(enqueueMatch);

    //Then
    expect(commandResult.isSuccess()).toBeFalsy();
    expect((commandResult as Failure).reason).toStrictEqual(new Error("This tournament doesn't exists."));
  });
});
