import { testTournamentTablesModule } from './TestTournamentTablesModule';
import { AssignTournamentTables } from '../../../../../src/modules/tournament-tables/core/application/command/AssignTournamentTables';
import { TournamentTablesWereAssigned } from '../../../../../src/modules/tournament-tables/core/domain/event/TournamentTablesWereAssigned';
import { CommandResult } from '../../../../../src/shared/core/application/command/CommandResult';
import Failure = CommandResult.Failure;
import { TableNumber } from '../../../../../src/modules/tournament-tables/core/domain/TableNumber';
import { TournamentTable } from '../../../../../src/modules/tournament-tables/core/domain/TournamentTable';
import { ExcludeFromAvailableTables } from '../../../../../src/modules/tournament-tables/core/application/command/ExcludeFromAvailableTables';
import { TableWasExcludedFromAvailableTables } from '../../../../../src/modules/tournament-tables/core/domain/event/TableWasExcludedFromAvailableTables';

describe('Tournament Tables | Write Side', function () {
  it('When assign tables then tables are assigned to the tournament as available to play by default', async () => {
    //Given
    const currentTime = new Date();
    const tournamentId = 'TournamentId';
    const tables = [
      { tableNumber: 1, tableName: 'Leonhart' },
      { tableNumber: 2, tableName: 'Garlando', availableToPlay: false },
      { tableNumber: 3, tableName: 'Leonhart', availableToPlay: true },
    ];
    const tournamentTablesModule = testTournamentTablesModule(currentTime);

    //When
    const assignTournamentTables = new AssignTournamentTables(tournamentId, tables);
    const commandResult = await tournamentTablesModule.executeCommand(assignTournamentTables);

    //Then
    const tablesAssigned: TournamentTable[] = [
      new TournamentTable({ tournamentId, tableNumber: TableNumber.from(1), tableName: 'Leonhart', availableToPlay: true }),
      new TournamentTable({ tournamentId, tableNumber: TableNumber.from(2), tableName: 'Garlando', availableToPlay: false }),
      new TournamentTable({ tournamentId, tableNumber: TableNumber.from(3), tableName: 'Leonhart', availableToPlay: true }),
    ];
    expect(commandResult.isSuccess()).toBeTruthy();
    expect(tournamentTablesModule.lastPublishedEvent()).toStrictEqual(
      new TournamentTablesWereAssigned({ occurredAt: currentTime, tablesAssigned }),
    );
  });

  it('Given tournament with tables assigned when attempt to assign tables again then assigning command should fail', async () => {
    //Given
    const currentTime = new Date();
    const tournamentId = 'TournamentId';
    const tables = [
      { tableNumber: 1, tableName: 'Leonhart' },
      { tableNumber: 2, tableName: 'Garlando' },
    ];
    const tournamentTablesModule = testTournamentTablesModule(currentTime);
    const assignTournamentTables = new AssignTournamentTables(tournamentId, tables);
    await tournamentTablesModule.executeCommand(assignTournamentTables);

    //When
    const commandResult = await tournamentTablesModule.executeCommand(assignTournamentTables);

    //Then
    expect(commandResult.isSuccess()).toBeFalsy();
    expect((commandResult as Failure).reason).toStrictEqual(new Error('Some tables are already assigned to that tournament.'));
  });

  it('When attempt to assign empty table list then assigning command should fail', async () => {
    //Given
    const currentTime = new Date();
    const tournamentId = 'TournamentId';
    const tables: { tableNumber: number; tableName: string }[] = [];
    const tournamentTablesModule = testTournamentTablesModule(currentTime);

    //When
    const assignTournamentTables = new AssignTournamentTables(tournamentId, tables);
    const commandResult = await tournamentTablesModule.executeCommand(assignTournamentTables);

    //Then
    expect(commandResult.isSuccess()).toBeFalsy();
    expect((commandResult as Failure).reason).toStrictEqual(new Error('Tournament must have at least 1 table assigned.'));
  });

  it('When attempt to assign tables with the same number, then assigning command should fail', async () => {
    //Given
    const currentTime = new Date();
    const tournamentId = 'TournamentId';
    const tables = [
      { tableNumber: 1, tableName: 'Leonhart' },
      { tableNumber: 1, tableName: 'Garlando' },
    ];
    const tournamentTablesModule = testTournamentTablesModule(currentTime);

    //When
    const assignTournamentTables = new AssignTournamentTables(tournamentId, tables);
    const commandResult = await tournamentTablesModule.executeCommand(assignTournamentTables);

    //Then
    expect(commandResult.isSuccess()).toBeFalsy();
    expect((commandResult as Failure).reason).toStrictEqual(new Error('Tables numbers must be different.'));
  });

  it('When exclude table then table is not available to play', async () => {
    //Given
    const currentTime = new Date();
    const tournamentId = 'TournamentId';
    const tables = [
      { tableNumber: 1, tableName: 'Leonhart' },
      { tableNumber: 2, tableName: 'Garlando' },
      { tableNumber: 3, tableName: 'Leonhart' },
    ];
    const tournamentTablesModule = testTournamentTablesModule(currentTime);
    await tournamentTablesModule.executeCommand(new AssignTournamentTables(tournamentId, tables));
    const tableExcluded = new TournamentTable({
      tournamentId,
      tableNumber: TableNumber.from(2),
      tableName: 'Garlando',
      availableToPlay: false,
    });

    //When
    const excludeTournamentTable = new ExcludeFromAvailableTables(tournamentId, 2);
    const commandResult = await tournamentTablesModule.executeCommand(excludeTournamentTable);

    //Then
    expect(commandResult.isSuccess()).toBeTruthy();
    expect(tournamentTablesModule.lastPublishedEvent()).toStrictEqual(
      new TableWasExcludedFromAvailableTables({ occurredAt: currentTime, tableExcluded }),
    );
  });

  it('When table is already not available then excluding command should fail', async () => {
    //Given
    const currentTime = new Date();
    const tournamentId = 'TournamentId';
    const tables = [
      { tableNumber: 1, tableName: 'Leonhart' },
      { tableNumber: 2, tableName: 'Garlando', availableToPlay: false },
    ];
    const tournamentTablesModule = testTournamentTablesModule(currentTime);
    await tournamentTablesModule.executeCommand(new AssignTournamentTables(tournamentId, tables));

    //When
    const excludeTournamentTable = new ExcludeFromAvailableTables(tournamentId, 2);
    const commandResult = await tournamentTablesModule.executeCommand(excludeTournamentTable);

    //Then
    expect(commandResult.isSuccess()).toBeFalsy();
    expect((commandResult as Failure).reason).toStrictEqual(
      new Error(`Table number 2 in tournament with id=${tournamentId} has been already excluded from available tournament tables`),
    );
  });

  it('When table is not assigned to tournament then excluding command should fail', async () => {
    //Given
    const currentTime = new Date();
    const tournamentId = 'TournamentId';
    const tables = [
      { tableNumber: 1, tableName: 'Leonhart' },
      { tableNumber: 2, tableName: 'Garlando', availableToPlay: true },
    ];
    const tournamentTablesModule = testTournamentTablesModule(currentTime);
    await tournamentTablesModule.executeCommand(new AssignTournamentTables(tournamentId, tables));

    //When
    const excludeTournamentTable = new ExcludeFromAvailableTables('anotherTournamentId', 2);
    const commandResult = await tournamentTablesModule.executeCommand(excludeTournamentTable);

    //Then
    expect(commandResult.isSuccess()).toBeFalsy();
    expect((commandResult as Failure).reason).toStrictEqual(
      new Error('Table number 2 is not assigned to the tournament with id=anotherTournamentId'),
    );
  });

  it('When include table then table is available to play', async () => {
    //Given
    const currentTime = new Date();
    const tournamentId = 'TournamentId';
    const tables = [
      { tableNumber: 1, tableName: 'Leonhart', availableToPlay: false },
      { tableNumber: 2, tableName: 'Garlando', availableToPlay: false },
    ];
    const tournamentTablesModule = testTournamentTablesModule(currentTime);
    await tournamentTablesModule.executeCommand(new AssignTournamentTables(tournamentId, tables));
    const tableIncluded = new TournamentTable({
      tournamentId,
      tableNumber: TableNumber.from(2),
      tableName: 'Garlando',
      availableToPlay: true,
    });

    //When
    const includeTournamentTable = new IncludeInAvailableTables(tournamentId, 2);
    const commandResult = await tournamentTablesModule.executeCommand(includeTournamentTable);

    //Then
    expect(commandResult.isSuccess()).toBeTruthy();
    expect(tournamentTablesModule.lastPublishedEvent()).toStrictEqual(
      new TableWasIncludedInAvailableTables({ occurredAt: currentTime, tableIncluded }),
    );
  });

  it('When table is already available then including command should fail', async () => {
    //Given
    const currentTime = new Date();
    const tournamentId = 'TournamentId';
    const tables = [
      { tableNumber: 1, tableName: 'Leonhart' },
      { tableNumber: 2, tableName: 'Garlando' },
    ];
    const tournamentTablesModule = testTournamentTablesModule(currentTime);
    await tournamentTablesModule.executeCommand(new AssignTournamentTables(tournamentId, tables));

    //When
    const includeTournamentTable = new IncludeInAvailableTables(tournamentId, 2);
    const commandResult = await tournamentTablesModule.executeCommand(includeTournamentTable);

    //Then
    expect(commandResult.isSuccess()).toBeFalsy();
    expect((commandResult as Failure).reason).toStrictEqual(
      new Error(`Table number 2 in tournament with id=${tournamentId} has been already included in available tournament tables`),
    );
  });

  it('When table is not assigned to tournament then including command should fail', async () => {
    //Given
    const currentTime = new Date();
    const tournamentId = 'TournamentId';
    const tables = [
      { tableNumber: 1, tableName: 'Leonhart' },
      { tableNumber: 2, tableName: 'Garlando', availableToPlay: true },
    ];
    const tournamentTablesModule = testTournamentTablesModule(currentTime);
    await tournamentTablesModule.executeCommand(new AssignTournamentTables(tournamentId, tables));

    //When
    const includeTournamentTable = new IncludeInAvailableTables(tournamentId, 2);
    const commandResult = await tournamentTablesModule.executeCommand(includeTournamentTable);

    //Then
    expect(commandResult.isSuccess()).toBeFalsy();
    expect((commandResult as Failure).reason).toStrictEqual(
      new Error('Table number 2 is not assigned to the tournament with id=anotherTournamentId'),
    );
  });
});
