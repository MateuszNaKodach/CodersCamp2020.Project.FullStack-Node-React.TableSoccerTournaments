import { testTournamentTablesModule } from './TestTournamentTablesModule';
import { AssignTournamentTables } from '../../../../../src/modules/tournament-tables/core/application/command/AssignTournamentTables';
import { TournamentTablesWereAssigned } from '../../../../../src/modules/tournament-tables/core/domain/event/TournamentTablesWereAssigned';
import { CommandResult } from '../../../../../src/shared/core/application/command/CommandResult';
import Failure = CommandResult.Failure;
import { TableNumber } from '../../../../../src/modules/tournament-tables/core/domain/TableNumber';
import { TournamentTable } from '../../../../../src/modules/tournament-tables/core/domain/TournamentTable';

describe('Table reservation', function () {
  it('When tables are added, then table reservation for the tournament is made', async () => {
    //Given
    const currentTime = new Date();
    const tournamentId = 'TournamentId';
    const tablesList = [
      { tableNumber: 1, tableName: 'Leonhart' },
      { tableNumber: 2, tableName: 'Garlando' },
      { tableNumber: 3, tableName: 'Leonhart' },
    ];
    const tournamentTablesModule = testTournamentTablesModule(currentTime);

    //When
    const addTournamentTables = new AssignTournamentTables(tournamentId, tablesList);
    const commandResult = await tournamentTablesModule.executeCommand(addTournamentTables);

    //Then
    const tablesAssigned: TournamentTable[] = [
      new TournamentTable({ tournamentId, tableNumber: TableNumber.from(1), tableName: 'Leonhart' }),
      new TournamentTable({ tournamentId, tableNumber: TableNumber.from(2), tableName: 'Garlando' }),
      new TournamentTable({ tournamentId, tableNumber: TableNumber.from(3), tableName: 'Leonhart' }),
    ];
    expect(commandResult.isSuccess()).toBeTruthy();
    expect(tournamentTablesModule.lastPublishedEvent()).toStrictEqual(
      new TournamentTablesWereAssigned({ occurredAt: currentTime, tablesAssigned }),
    );
  });

  it('Given tournament with tables assigned, when attempt to add tables again, command should fail', async () => {
    //Given
    const currentTime = new Date();
    const tournamentId = 'TournamentId';
    const tablesList = [
      { tableNumber: 1, tableName: 'Leonhart' },
      { tableNumber: 2, tableName: 'Garlando' },
    ];
    const tournamentTablesModule = testTournamentTablesModule(currentTime);
    const addTournamentTables = new AssignTournamentTables(tournamentId, tablesList);
    await tournamentTablesModule.executeCommand(addTournamentTables);

    //When
    const commandResult = await tournamentTablesModule.executeCommand(addTournamentTables);

    //Then
    expect(commandResult.isSuccess()).toBeFalsy();
    expect((commandResult as Failure).reason).toStrictEqual(new Error('Some tables are already assigned to that tournament.'));
  });

  it('When attempt to add empty table list, then command should fail', async () => {
    //Given
    const currentTime = new Date();
    const tournamentId = 'TournamentId';
    const tablesList: { tableNumber: number; tableName: string }[] = [];
    const tournamentTablesModule = testTournamentTablesModule(currentTime);

    //When
    const addTournamentTables = new AssignTournamentTables(tournamentId, tablesList);
    const commandResult = await tournamentTablesModule.executeCommand(addTournamentTables);

    //Then
    expect(commandResult.isSuccess()).toBeFalsy();
    expect((commandResult as Failure).reason).toStrictEqual(new Error('Tournament must have at least 1 table assigned.'));
  });
});
