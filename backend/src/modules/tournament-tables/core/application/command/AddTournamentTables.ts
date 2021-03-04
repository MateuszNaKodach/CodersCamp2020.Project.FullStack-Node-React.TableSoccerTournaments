import {TableNumber} from "../../domain/TableNumber";

export class AddTournamentTables {
    readonly tournamentId: string;
    readonly tableList: { tableNumber: TableNumber; tableName: string }[];

    constructor(tournamentId: string, tableList: { tableNumber: TableNumber; tableName: string }[]) {
        this.tournamentId = tournamentId;
        this.tableList = tableList;
    }
}
