import { StartTournament } from '../../../../shared/infrastructure/command/CommandsTestFixtures';
import { testDoublesTournamentsModule } from './TestDoublesTournamentsModule';
import { FromListIdGeneratorStub } from '../../../../test-support/shared/core/FromListIdGeneratorStub';
import { TournamentWasStarted } from '../../../../../src/modules/doubles-tournament/core/domain/event/TournamentWasStarted';
import { CommandResult } from '../../../../../src/shared/core/application/command/CommandResult';
import Failure = CommandResult.Failure;
import { createTournamentForTests } from './TestDoublesTournamentModuleWithTournament';

describe('Start tournament', () => {
  it('When command start tournament was called, then tournament was started | Happy path', async () => {
    //Given
    const tournamentId = 'TournamentId';
    const currentTime = new Date();
    const team1Id = 'Team1Id';
    const team2Id = 'Team2Id';

    const doublesTournament = await createTournamentForTests(tournamentId, currentTime, team1Id, team2Id);

    //When
    const startTournament = new StartTournament({
      tournamentId: tournamentId,
    });
    const commandResult = await doublesTournament.executeCommand(startTournament);

    //Then
    expect(commandResult.isSuccess()).toBeTruthy();

    expect(doublesTournament.lastPublishedEvent()).toStrictEqual(
      new TournamentWasStarted({
        occurredAt: currentTime,
        tournamentId: tournamentId,
      }),
    );
  });

  it('When command start tournament was called, but tournament under given id does bot exist, then tournament was not started and command failed', async () => {
    //Given
    const tournamentId = 'TournamentId';
    const currentTime = new Date();
    const team1Id = 'Team1Id';
    const team2Id = 'Team2Id';
    const entityIdGen = FromListIdGeneratorStub([team1Id, team2Id]);

    const doublesTournament = testDoublesTournamentsModule(currentTime, entityIdGen);

    //When
    const startTournament = new StartTournament({
      tournamentId: tournamentId,
    });
    const commandResult = await doublesTournament.executeCommand(startTournament);

    //Then
    expect(commandResult.isSuccess()).not.toBeTruthy();
    expect((commandResult as Failure).reason).toStrictEqual(new Error('Such tournament does not exists.'));
    expect(doublesTournament.lastPublishedEvent()).toStrictEqual(undefined);
  });
});
