import { testTournamentTablesModule } from './TestTournamentTablesModule';
import { AssignTablesToTournament } from '../../../../../src/modules/tournament-tables/core/application/command/AssignTablesToTournament';
import { TournamentTablesWereAssigned } from '../../../../../src/modules/tournament-tables/core/domain/event/TournamentTablesWereAssigned';
import { CommandResult } from '../../../../../src/shared/core/application/command/CommandResult';
import Failure = CommandResult.Failure;
import { TableNumber } from '../../../../../src/modules/tournament-tables/core/domain/TableNumber';
import { TournamentTable } from '../../../../../src/modules/tournament-tables/core/domain/TournamentTable';
import { BookTournamentTable } from '../../../../../src/modules/tournament-tables/core/application/command/BookTournamentTable';
import { TournamentTableWasBooked } from '../../../../../src/modules/tournament-tables/core/domain/event/TournamentTableWasBooked';
import { ReleaseTournamentTable } from '../../../../../src/modules/tournament-tables/core/application/command/ReleaseTournamentTable';
import { TournamentTableWasReleased } from '../../../../../src/modules/tournament-tables/core/domain/event/TournamentTableWasReleased';

describe('Tournament Tables | Write Side', function () {
  it('When assign tables then tables are assigned to the tournament as free by default', async () => {
    //Given
    const currentTime = new Date();
    const tournamentId = 'TournamentId';
    const tables = [
      { tableNumber: 1, tableName: 'Leonhart' },
      { tableNumber: 2, tableName: 'Garlando', isFree: false },
      { tableNumber: 3, tableName: 'Leonhart', isFree: true },
    ];
    const tournamentTablesModule = testTournamentTablesModule(currentTime);

    //When
    const assignTablesToTournament = new AssignTablesToTournament(tournamentId, tables);
    const commandResult = await tournamentTablesModule.executeCommand(assignTablesToTournament);

    //Then
    const tablesAssigned: TournamentTable[] = [
      new TournamentTable({ tournamentId, tableNumber: TableNumber.from(1), tableName: 'Leonhart', isFree: true }),
      new TournamentTable({ tournamentId, tableNumber: TableNumber.from(2), tableName: 'Garlando', isFree: false }),
      new TournamentTable({ tournamentId, tableNumber: TableNumber.from(3), tableName: 'Leonhart', isFree: true }),
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
    const assignTablesToTournament = new AssignTablesToTournament(tournamentId, tables);
    await tournamentTablesModule.executeCommand(assignTablesToTournament);

    //When
    const commandResult = await tournamentTablesModule.executeCommand(assignTablesToTournament);

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
    const assignTablesToTournament = new AssignTablesToTournament(tournamentId, tables);
    const commandResult = await tournamentTablesModule.executeCommand(assignTablesToTournament);

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
    const assignTablesToTournament = new AssignTablesToTournament(tournamentId, tables);
    const commandResult = await tournamentTablesModule.executeCommand(assignTablesToTournament);

    //Then
    expect(commandResult.isSuccess()).toBeFalsy();
    expect((commandResult as Failure).reason).toStrictEqual(new Error('Tables numbers must be different.'));
  });

  it('When book table then table becomes not free', async () => {
    //Given
    const currentTime = new Date();
    const tournamentId = 'TournamentId';
    const tables = [
      { tableNumber: 1, tableName: 'Leonhart' },
      { tableNumber: 2, tableName: 'Garlando' },
      { tableNumber: 3, tableName: 'Leonhart' },
    ];
    const tournamentTablesModule = testTournamentTablesModule(currentTime);
    await tournamentTablesModule.executeCommand(new AssignTablesToTournament(tournamentId, tables));

    //When
    const bookTournamentTable = new BookTournamentTable(tournamentId, 2);
    const commandResult = await tournamentTablesModule.executeCommand(bookTournamentTable);

    //Then
    expect(commandResult.isSuccess()).toBeTruthy();
    expect(tournamentTablesModule.lastPublishedEvent()).toStrictEqual(
      new TournamentTableWasBooked({ occurredAt: currentTime, tournamentId, tableNumber: 2 }),
    );
  });

  it('When table is already not free then booking command should fail', async () => {
    //Given
    const currentTime = new Date();
    const tournamentId = 'TournamentId';
    const tables = [
      { tableNumber: 1, tableName: 'Leonhart' },
      { tableNumber: 2, tableName: 'Garlando', isFree: false },
    ];
    const tournamentTablesModule = testTournamentTablesModule(currentTime);
    await tournamentTablesModule.executeCommand(new AssignTablesToTournament(tournamentId, tables));

    //When
    const bookTournamentTable = new BookTournamentTable(tournamentId, 2);
    const commandResult = await tournamentTablesModule.executeCommand(bookTournamentTable);

    //Then
    expect(commandResult.isSuccess()).toBeFalsy();
    expect((commandResult as Failure).reason).toStrictEqual(
      new Error(`Table number 2 in tournament with id=${tournamentId} has been already booked`),
    );
  });

  it('When table is not assigned to tournament then booking command should fail', async () => {
    //Given
    const currentTime = new Date();
    const tournamentId = 'TournamentId';
    const tables = [
      { tableNumber: 1, tableName: 'Leonhart' },
      { tableNumber: 2, tableName: 'Garlando', isFree: true },
    ];
    const tournamentTablesModule = testTournamentTablesModule(currentTime);
    await tournamentTablesModule.executeCommand(new AssignTablesToTournament(tournamentId, tables));

    //When
    const bookTournamentTable = new BookTournamentTable('anotherTournamentId', 2);
    const commandResult = await tournamentTablesModule.executeCommand(bookTournamentTable);

    //Then
    expect(commandResult.isSuccess()).toBeFalsy();
    expect((commandResult as Failure).reason).toStrictEqual(
      new Error('Table number 2 is not assigned to the tournament with id=anotherTournamentId'),
    );
  });

  it('When release table then table becomes free', async () => {
    //Given
    const currentTime = new Date();
    const tournamentId = 'TournamentId';
    const tables = [
      { tableNumber: 1, tableName: 'Leonhart', isFree: false },
      { tableNumber: 2, tableName: 'Garlando', isFree: false },
    ];
    const tournamentTablesModule = testTournamentTablesModule(currentTime);
    await tournamentTablesModule.executeCommand(new AssignTablesToTournament(tournamentId, tables));

    //When
    const releaseTournamentTable = new ReleaseTournamentTable(tournamentId, 2);
    const commandResult = await tournamentTablesModule.executeCommand(releaseTournamentTable);

    //Then
    expect(commandResult.isSuccess()).toBeTruthy();
    expect(tournamentTablesModule.lastPublishedEvent()).toStrictEqual(
      new TournamentTableWasReleased({ occurredAt: currentTime, tournamentId, tableNumber: 2 }),
    );
  });

  it('When table is already free then releasing command should fail', async () => {
    //Given
    const currentTime = new Date();
    const tournamentId = 'TournamentId';
    const tables = [
      { tableNumber: 1, tableName: 'Leonhart' },
      { tableNumber: 2, tableName: 'Garlando' },
    ];
    const tournamentTablesModule = testTournamentTablesModule(currentTime);
    await tournamentTablesModule.executeCommand(new AssignTablesToTournament(tournamentId, tables));

    //When
    const releaseTournamentTable = new ReleaseTournamentTable(tournamentId, 2);
    const commandResult = await tournamentTablesModule.executeCommand(releaseTournamentTable);

    //Then
    expect(commandResult.isSuccess()).toBeFalsy();
    expect((commandResult as Failure).reason).toStrictEqual(
      new Error(`Table number 2 in tournament with id=${tournamentId} is already free`),
    );
  });

  it('When table is not assigned to tournament then releasing command should fail', async () => {
    //Given
    const currentTime = new Date();
    const tournamentId = 'TournamentId';
    const tables = [
      { tableNumber: 1, tableName: 'Leonhart' },
      { tableNumber: 2, tableName: 'Garlando', isFree: true },
    ];
    const tournamentTablesModule = testTournamentTablesModule(currentTime);
    await tournamentTablesModule.executeCommand(new AssignTablesToTournament(tournamentId, tables));

    //When
    const releaseTournamentTable = new ReleaseTournamentTable('anotherTournamentId', 2);
    const commandResult = await tournamentTablesModule.executeCommand(releaseTournamentTable);

    //Then
    expect(commandResult.isSuccess()).toBeFalsy();
    expect((commandResult as Failure).reason).toStrictEqual(
      new Error('Table number 2 is not assigned to the tournament with id=anotherTournamentId'),
    );
  });
});
