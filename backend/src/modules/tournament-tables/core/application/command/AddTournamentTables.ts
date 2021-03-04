export class AddTournamentTables {
    readonly tournamentId: string;
    readonly tableList: { tableId: string; tableName: string }[];

    constructor(tournamentId: string, tableList: { tableId: string; tableName: string }[]) {
        this.tournamentId = tournamentId;
        this.tableList = tableList;
    }
}
