import { FromListIdGeneratorStub } from "../../../../test-support/shared/core/FromListIdGeneratorStub";
import { testTournamentTablesModule } from "./TestTournamentTablesModule";
import { AddTournamentTables } from "../../../../../src/modules/tournament-tables/core/application/command/AddTournamentTables";
import { TablesWereAssignedToTournament } from "../../../../../src/modules/tournament-tables/core/domain/TablesWereAssignedToTournament";
import { CommandResult } from "../../../../../src/shared/core/application/command/CommandResult";
import Failure = CommandResult.Failure;

describe('Table reservation', function () {
    it('When tables are added, then table reservation for the tournament is made', async () => {
        //Given
        const currentTime = new Date();
        const tournamentId = 'TournamentId';
        const entityIdGen = FromListIdGeneratorStub(['TableId1', 'TableId2', 'TableId3']);
        const tablesList = [
            { tableId: 'TableId1', tableName: 'Leonhart' },
            { tableId: 'TableId2', tableName: 'Garlando' },
            { tableId: 'TableId3', tableName: 'Leonhart' },
        ];
        const tournamentTables = testTournamentTablesModule(currentTime, entityIdGen);

        //When
        const addTournamentTables = new AddTournamentTables(tournamentId, tablesList);
        const commandResult = await tournamentTables.executeCommand(addTournamentTables);

        //Then
        expect(commandResult.isSuccess()).toBeTruthy();
        expect(tournamentTables.lastPublishedEvent()).toStrictEqual(
            new TablesWereAssignedToTournament(tablesList.map(table => ({ occurredAt: currentTime, tournamentId, ...table })))
        );
    });

    it('Given tournament with tables assigned, when attempt to add tables again, command should fail', async () => {
        //Given
        const currentTime = new Date();
        const tournamentId = 'TournamentId';
        const entityIdGen = FromListIdGeneratorStub(['TableId1', 'TableId2']);
        const tablesList = [
            { tableId: 'TableId1', tableName: 'Leonhart' },
            { tableId: 'TableId2', tableName: 'Garlando' }
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
        const tablesList: { tableId: string, tableName: string }[] = [];
        const tournamentTables = testTournamentTablesModule(currentTime, entityIdGen);

        //When
        const addTournamentTables = new AddTournamentTables(tournamentId, tablesList);
        const commandResult = await tournamentTables.executeCommand(addTournamentTables);

        //Then
        expect(commandResult.isSuccess()).toBeFalsy();
        expect((commandResult as Failure).reason).toStrictEqual(new Error('Tournament must have at least 1 table assigned.'));
    });
});
