import { FromListIdGeneratorStub } from '../../../../test-support/shared/core/FromListIdGeneratorStub';
import { testDoublesTournamentsModule } from './TestDoublesTournamentsModule';
import { CallMatch } from '../../../../../src/modules/doubles-tournament/core/application/command/CallMatch';
import { MatchWasCalled } from '../../../../../src/modules/doubles-tournament/core/domain/event/MatchWasCalled';
import { BookTournamentTable } from '../../../../../src/modules/tournament-tables/core/application/command/BookTournamentTable';
import { InMemoryCommandBus } from '../../../../../src/shared/infrastructure/core/application/command/InMemoryCommandBus';
import { CommandHandler } from '../../../../../src/shared/core/application/command/CommandHandler';
import { CommandResult } from '../../../../../src/shared/core/application/command/CommandResult';
import Failure = CommandResult.Failure;

describe('Execute command CallMatch', () => {
  const team1Id = 'Team1Id';
  const team2Id = 'Team2Id';
  const tournamentId = 'TournamentId';
  const matchNumber = 1;
  const tableNumber = 1;
  const currentTime = new Date();
  const entityIdGen = FromListIdGeneratorStub([team1Id, team2Id]);

  it('Then publish event and execute BookTournamentTable command from different module | happy path', async () => {
    //Given
    const alwaysSuccessBookTournamentTableCommandHandler: CommandHandler<BookTournamentTable> = {
      async execute(command: BookTournamentTable): Promise<CommandResult> {
        return CommandResult.success();
      },
    };
    const commandBus = new InMemoryCommandBus();
    commandBus.registerHandler(BookTournamentTable, alwaysSuccessBookTournamentTableCommandHandler);

    const doublesTournament = testDoublesTournamentsModule(currentTime, entityIdGen, commandBus);

    //When
    const callMatch = new CallMatch({
      tournamentId: tournamentId,
      calledMatch: { matchNumber: matchNumber, team1Id: team1Id, team2Id: team2Id },
      tableNumber: tableNumber,
    });
    const commandResult = await doublesTournament.executeCommand(callMatch);

    //Then
    expect(commandResult.isSuccess()).toBeTruthy();

    expect(doublesTournament.lastPublishedEvent()).toStrictEqual(
      new MatchWasCalled({
        occurredAt: currentTime,
        tournamentId: tournamentId,
        calledMatch: { matchNumber: matchNumber, team1Id: team1Id, team2Id: team2Id },
        tableNumber: tableNumber,
      }),
    );
  });

  it('Then publish event and execute BookTournamentTable command from different module | table has been already booked', async () => {
    //Given
    const alwaysFailBookTournamentTableCommandHandler: CommandHandler<BookTournamentTable> = {
      async execute(command: BookTournamentTable): Promise<CommandResult> {
        return CommandResult.failureDueTo(new Error('Table has been already booked!'));
      },
    };
    const commandBus = new InMemoryCommandBus();
    commandBus.registerHandler(BookTournamentTable, alwaysFailBookTournamentTableCommandHandler);

    const doublesTournament = testDoublesTournamentsModule(currentTime, entityIdGen, commandBus);

    //When
    const callMatch = new CallMatch({
      tournamentId: tournamentId,
      calledMatch: { matchNumber: matchNumber, team1Id: team1Id, team2Id: team2Id },
      tableNumber: tableNumber,
    });
    const commandResult = await doublesTournament.executeCommand(callMatch);

    //Then
    expect((commandResult as Failure).reason).toStrictEqual(new Error('Table has been already booked!'));
    expect(doublesTournament.lastPublishedEvent()).toStrictEqual(undefined);
  });
});
