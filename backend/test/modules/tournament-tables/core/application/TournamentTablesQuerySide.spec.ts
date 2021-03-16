import { testTournamentTablesModule } from './TestTournamentTablesModule';
import { AssignTournamentTables } from '../../../../../src/modules/tournament-tables/core/application/command/AssignTournamentTables';
import { TableNumber } from '../../../../../src/modules/tournament-tables/core/domain/TableNumber';
import { TournamentTable } from '../../../../../src/modules/tournament-tables/core/domain/TournamentTable';
import {
  FindTablesByTournamentId,
  FindTablesByTournamentIdResult,
} from '../../../../../src/modules/tournament-tables/core/application/query/FindTablesByTournamentId';

describe('Tournament Tables | Query Side', function () {
  it('When any table assigned to given tournament, then FindTablesByTournamentId returns tables list', async () => {
    //Given
    const currentTime = new Date();
    const tournamentId = 'TournamentId';
    const tables = [
      { tableNumber: 5, tableName: 'Bonzini', availableToPlay: true },
      { tableNumber: 8, tableName: 'P4P', availableToPlay: false },
    ];
    const tournamentTablesModule = testTournamentTablesModule(currentTime);
    const assignTournamentTables = new AssignTournamentTables(tournamentId, tables);
    await tournamentTablesModule.executeCommand(assignTournamentTables);

    //When
    const findTablesByIdResult = await tournamentTablesModule.executeQuery<FindTablesByTournamentIdResult>(
      new FindTablesByTournamentId({ tournamentId }),
    );

    //Then
    expect(findTablesByIdResult).toStrictEqual([
      new TournamentTable({
        tournamentId,
        tableNumber: TableNumber.from(5),
        tableName: 'Bonzini',
        availableToPlay: true,
      }),
      new TournamentTable({
        tournamentId,
        tableNumber: TableNumber.from(8),
        tableName: 'P4P',
        availableToPlay: false,
      }),
    ]);
  });

  it('When any table not assigned to given tournament, then FindTablesByTournamentId returns undefined', async () => {
    //Given
    const currentTime = new Date();
    const tournamentId = 'TournamentId';
    const tournamentTablesModule = testTournamentTablesModule(currentTime);

    //When
    const findTablesByIdResult = await tournamentTablesModule.executeQuery<FindTablesByTournamentIdResult>(
      new FindTablesByTournamentId({ tournamentId }),
    );

    //Then
    expect(findTablesByIdResult).toStrictEqual([]);
  });
});
