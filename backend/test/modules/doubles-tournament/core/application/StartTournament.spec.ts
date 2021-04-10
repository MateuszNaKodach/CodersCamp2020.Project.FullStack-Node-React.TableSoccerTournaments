import { StartTournament } from '../../../../shared/infrastructure/command/CommandsTestFixtures';
import { testDoublesTournamentsModule } from './TestDoublesTournamentsModule';
import { FromListIdGeneratorStub } from '../../../../test-support/shared/core/FromListIdGeneratorStub';
import { TournamentWasStarted } from '../../../../../src/modules/doubles-tournament/core/domain/event/TournamentWasStarted';

describe('Start tournament', () => {
  it('When command start tournament was called, then tournament was started', async () => {
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
    expect(commandResult.isSuccess()).toBeTruthy();

    expect(doublesTournament.lastPublishedEvent()).toStrictEqual(
      new TournamentWasStarted({
        occurredAt: currentTime,
        tournamentId: tournamentId,
      }),
    );
  });
});
