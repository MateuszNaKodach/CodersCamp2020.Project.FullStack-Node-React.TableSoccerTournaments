import { CommandBus } from '../../../../../src/shared/core/application/command/CommandBus';
import { testDoublesTournamentsModule } from './TestDoublesTournamentsModule';
import { FromListIdGeneratorStub } from '../../../../test-support/shared/core/FromListIdGeneratorStub';
import { InMemoryCommandBus } from '../../../../../src/shared/infrastructure/core/application/command/InMemoryCommandBus';
import { TestModuleCore } from '../../../../test-support/shared/core/TestModuleCore';
import { TournamentMatchWasEnded } from '../../../../../src/modules/doubles-tournament/core/domain/event/TournamentMatchWasEnded';
import { EnqueueMatch } from '../../../../../src/modules/doubles-tournament/core/application/command/EnqueueMatch';
import { ReleaseTournamentTable } from '../../../../../src/modules/tournament-tables/core/application/command/ReleaseTournamentTable';
import { CallMatch } from '../../../../../src/modules/doubles-tournament/core/application/command/CallMatch';

describe('Release table when tournament match was ended', () => {
  it('When tournament match was ended, then release tournament table', async () => {
    //Given
    const team1Id = 'Team1Id';
    const team2Id = 'Team2Id';
    const tournamentId = 'TournamentId';
    const matchNumber = 3;
    const tableNumber = 5;
    const currentTime = new Date();
    const commandBus: CommandBus = new InMemoryCommandBus();
    const spy = jest.spyOn(commandBus, 'execute');
    const entityIdGen = FromListIdGeneratorStub([team1Id, team2Id]);
    const doublesTournament: TestModuleCore = testDoublesTournamentsModule(currentTime, entityIdGen, commandBus);
    await doublesTournament.executeCommand(
      new EnqueueMatch({
        tournamentId: tournamentId,
        matchNumber: matchNumber,
        team1Id: team1Id,
        team2Id: team2Id,
      }),
    );
    await doublesTournament.executeCommand(
      new CallMatch({
        tournamentId: tournamentId,
        calledMatch: { matchNumber, team1Id, team2Id },
        tableNumber: tableNumber,
      }),
    );

    //When
    const tournamentMatchWasEnded = new TournamentMatchWasEnded({
      occurredAt: currentTime,
      tournamentId: tournamentId,
      matchNumber: matchNumber,
      winnerId: team1Id,
    });
    doublesTournament.publishEvent(tournamentMatchWasEnded);

    //Then
    expect(spy).toBeCalledWith(new ReleaseTournamentTable(tournamentId, tableNumber));
  });
});
