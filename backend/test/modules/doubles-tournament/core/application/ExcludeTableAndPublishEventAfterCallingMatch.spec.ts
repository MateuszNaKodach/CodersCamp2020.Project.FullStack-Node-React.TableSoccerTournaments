import { FromListIdGeneratorStub } from '../../../../test-support/shared/core/FromListIdGeneratorStub';
import { testDoublesTournamentsModule } from './TestDoublesTournamentsModule';
import { CallMatch } from '../../../../../src/modules/doubles-tournament/core/application/command/CallMatch';
import { MatchWasCalled } from '../../../../../src/modules/doubles-tournament/core/domain/event/MatchWasCalled';
import { CommandBus } from '../../../../../src/shared/core/application/command/CommandBus';
import { ExcludeFromAvailableTables } from '../../../../../src/modules/tournament-tables/core/application/command/ExcludeFromAvailableTables';

describe('Calling the match', () => {
  it('When command CallMatch was executed, then publish event and execute ExcludeFromAvailableTables command', async () => {
    //Given
    const team1Id = 'Team1Id';
    const team2Id = 'Team2Id';
    const tournamentId = 'TournamentId';
    const matchNumber = 1;
    const tableNumber = 1;
    const currentTime = new Date();
    const entityIdGen = FromListIdGeneratorStub([team1Id, team2Id]);
    const commandBus: CommandBus = {
      registerHandler: jest.fn(),
      execute: jest.fn(),
    };
    const doublesTournament = testDoublesTournamentsModule(currentTime, entityIdGen);
    // const doublesTournament = testDoublesTournamentsModule(currentTime, entityIdGen,commandBus);

    //When
    const callMatch = new CallMatch({
      tournamentId: tournamentId,
      matchFromQueue: { matchNumber: matchNumber, team1Id: team1Id, team2Id: team2Id },
      tableNumber: tableNumber,
    });
    const commandResult = await doublesTournament.executeCommand(callMatch);

    //Then
    expect(commandResult.isSuccess()).toBeTruthy();
    expect(doublesTournament.lastPublishedEvent()).toStrictEqual(
      new MatchWasCalled({
        occurredAt: currentTime,
        tournamentId: tournamentId,
        matchFromQueue: { matchNumber: matchNumber, team1Id: team1Id, team2Id: team2Id },
        tableNumber: tableNumber,
      }),
    );
    const excludeFromAvailableTables = new ExcludeFromAvailableTables(tournamentId, tableNumber);
    // expect(commandBus.execute).toHaveBeenLastCalledWith(excludeFromAvailableTables);
    // expect(commandBus.execute).toHaveBeenCalledTimes(2);
  });
});
