import { testTournamentTablesModule } from './TestTournamentTablesModule';
import { AssignTablesToTournament } from '../../../../../src/modules/tournament-tables/core/application/command/AssignTablesToTournament';
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
      { tableNumber: 5, tableName: 'Bonzini', isFree: true },
      { tableNumber: 8, tableName: 'P4P', isFree: false },
    ];
    const tournamentTablesModule = testTournamentTablesModule(currentTime);
    const assignTablesToTournament = new AssignTablesToTournament(tournamentId, tables);
    await tournamentTablesModule.executeCommand(assignTablesToTournament);

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
        isFree: true,
        version: 1,
      }),
      new TournamentTable({
        tournamentId,
        tableNumber: TableNumber.from(8),
        tableName: 'P4P',
        isFree: false,
        version: 1,
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
