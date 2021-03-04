import { FromListIdGeneratorStub } from "../../../../test-support/shared/core/FromListIdGeneratorStub";
import { testTournamentTablesModule } from "./TestTournamentTablesModule";
import { AddTournamentTables } from "../../../../../src/modules/tournament-tables/core/application/command/AddTournamentTables";
import { TablesWereAssignedToTournament } from "../../../../../src/modules/tournament-tables/core/domain/TablesWereAssignedToTournament";

describe('Table reservation', function () {
    it('When table is added, then table reservation for the tournament is made', async () => {
        //Given
        const currentTime = new Date();
        const tournamentId = 'TournamentId';
        const entityIdGen = FromListIdGeneratorStub(['TableId1', 'TableId2', 'TableId3']);
        const tableList = [
            { tableId: 'TableId1', tableName: 'Leonhart' },
            { tableId: 'TableId2', tableName: 'Garlando' },
            { tableId: 'TableId3', tableName: 'Leonhart' },
        ];
        const tournamentTables = testTournamentTablesModule(currentTime, entityIdGen);

        //When
        const addTournamentTables = new AddTournamentTables(tournamentId, tableList);
        const commandResult = await tournamentTables.executeCommand(addTournamentTables);

        //Then
        expect(commandResult.isSuccess()).toBeTruthy();
        expect(tournamentTables.lastPublishedEvent()).toStrictEqual(
            new TablesWereAssignedToTournament(tableList.map(table => ({ occurredAt: currentTime, tournamentId, ...table })))
        );
    });
});
