import { FromListIdGeneratorStub } from '../../../../test-support/shared/core/FromListIdGeneratorStub';
import { testDoublesTournamentsModule } from './TestDoublesTournamentsModule';
import { CallMatch } from '../../../../../src/modules/doubles-tournament/core/application/command/CallMatch';
import { MatchWasCalled } from '../../../../../src/modules/doubles-tournament/core/domain/event/MatchWasCalled';
import { BookTournamentTable } from '../../../../../src/modules/tournament-tables/core/application/command/BookTournamentTable';
import { InMemoryCommandBus } from '../../../../../src/shared/infrastructure/core/application/command/InMemoryCommandBus';
import { CommandHandler } from '../../../../../src/shared/core/application/command/CommandHandler';
import { CommandResult } from '../../../../../src/shared/core/application/command/CommandResult';

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

    const bookTournamentTableCommandHandler: CommandHandler<BookTournamentTable> = {
      async execute(command: BookTournamentTable): Promise<CommandResult> {
        return CommandResult.success();
      },
    };

    const commandBus = new InMemoryCommandBus();
    commandBus.registerHandler(BookTournamentTable, bookTournamentTableCommandHandler);
    const spy = jest.spyOn(commandBus, 'execute');

    const doublesTournament = testDoublesTournamentsModule(currentTime, entityIdGen, commandBus);

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

    expect(spy).toHaveBeenCalledTimes(2);

    const bookFromAvailableTables = new BookTournamentTable(tournamentId, tableNumber);
    expect(commandBus.execute).toHaveBeenLastCalledWith(bookFromAvailableTables);
  });
});
