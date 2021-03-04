import { FromListIdGeneratorStub } from "../../../../test-support/shared/core/FromListIdGeneratorStub";
import { testTournamentTablesModule } from "./TestTournamentTablesModule";
import { AddTournamentTables } from "../../../../../src/modules/tournament-tables/core/application/command/AddTournamentTables";
import { TournamentTablesWereAssigned } from "../../../../../src/modules/tournament-tables/core/domain/TournamentTablesWereAssigned";
import { CommandResult } from "../../../../../src/shared/core/application/command/CommandResult";
import Failure = CommandResult.Failure;
import {TableNumber} from "../../../../../src/modules/tournament-tables/core/domain/TableNumber";
import {TournamentTable} from "../../../../../src/modules/tournament-tables/core/domain/TournamentTable";
import {TableId} from "../../../../../src/modules/tournament-tables/core/domain/TableId";

describe('Table reservation', function () {
    it('When tables are added, then table reservation for the tournament is made', async () => {
        //Given
        const currentTime = new Date();
        const tournamentId = 'TournamentId';
        const tableIdsList = ['TableId1', 'TableId2', 'TableId3'];
        const entityIdGen = FromListIdGeneratorStub(tableIdsList);
        const tablesList = [
            { tableNumber: TableNumber.from(1), tableName: 'Leonhart' },
            { tableNumber: TableNumber.from(2), tableName: 'Garlando' },
            { tableNumber: TableNumber.from(3), tableName: 'Leonhart' },
        ];
        const tournamentTablesModule = testTournamentTablesModule(currentTime, entityIdGen);

        //When
        const addTournamentTables = new AddTournamentTables(tournamentId, tablesList);
        const commandResult = await tournamentTablesModule.executeCommand(addTournamentTables);

        //Then
        const tournamentTables: TournamentTable[] = tablesList.map(
            (table, i) =>
                ({ tournamentId, tableId: TableId.from(tableIdsList[i]), ...tablesList[i] })
        )
        expect(commandResult.isSuccess()).toBeTruthy();
        expect(tournamentTablesModule.lastPublishedEvent()).toStrictEqual(
            new TournamentTablesWereAssigned(tournamentTables.map(table => ({ occurredAt: currentTime, ...table })))
        );
    });

    it('Given tournament with tables assigned, when attempt to add tables again, command should fail', async () => {
        //Given
        const currentTime = new Date();
        const tournamentId = 'TournamentId';
        const entityIdGen = FromListIdGeneratorStub(['TableId1', 'TableId2']);
        const tablesList = [
            { tableNumber: TableNumber.from(1), tableName: 'Leonhart' },
            { tableNumber: TableNumber.from(2), tableName: 'Garlando' }
            ];
        const tournamentTables = testTournamentTablesModule(currentTime, entityIdGen);
        const addTournamentTables = new AddTournamentTables(tournamentId, tablesList);
        await tournamentTables.executeCommand(addTournamentTables);

        //When
        const commandResult = await tournamentTables.executeCommand(addTournamentTables);

        //Then
        expect(commandResult.isSuccess()).toBeFalsy();
        expect((commandResult as Failure).reason).toStrictEqual(new Error('Some tables are already assigned to that tournament.'));
    });

    it('When attempt to add empty table list, then command should fail', async () => {
        //Given
        const currentTime = new Date();
        const tournamentId = 'TournamentId';
        const entityIdGen = FromListIdGeneratorStub(['TableId1']);
        const tablesList: { tableNumber: TableNumber, tableName: string }[] = [];
        const tournamentTables = testTournamentTablesModule(currentTime, entityIdGen);

        //When
        const addTournamentTables = new AddTournamentTables(tournamentId, tablesList);
        const commandResult = await tournamentTables.executeCommand(addTournamentTables);

        //Then
        expect(commandResult.isSuccess()).toBeFalsy();
        expect((commandResult as Failure).reason).toStrictEqual(new Error('Tournament must have at least 1 table assigned.'));
    });
});
