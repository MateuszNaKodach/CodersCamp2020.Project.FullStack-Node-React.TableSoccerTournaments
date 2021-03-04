export class TournamentTable {
    readonly tournamentId: string;
    readonly tableId: string;
    readonly tableName: string;

    constructor(props: { tournamentId: string; tableId: string; tableName: string }) {
        this.tournamentId = props.tournamentId;
        this.tableId = props.tableId;
        this.tableName = props.tableName;
    }
}