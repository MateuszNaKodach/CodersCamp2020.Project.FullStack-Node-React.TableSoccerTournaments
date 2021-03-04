import {EntityIdGenerator} from "../../../../shared/core/application/EntityIdGenerator";
import {DomainCommandResult} from "../../../../shared/core/domain/DomainCommandResult";
import {TournamentTablesWereAssigned} from "./event/TournamentTablesWereAssigned";
import {TableNumber} from "./TableNumber";
import {TableId} from "./TableId";

export class TournamentTable {
    readonly tournamentId: string;
    readonly tableId: TableId;
    readonly tableNumber: TableNumber;
    readonly tableName: string;

    constructor(props: { tournamentId: string; tableId: TableId; tableNumber: TableNumber; tableName: string }) {
        this.tournamentId = props.tournamentId;
        this.tableId = props.tableId;
        this.tableNumber = props.tableNumber;
        this.tableName = props.tableName;
    }
}

export function assignTablesToTournament(
    state: TournamentTable[] | undefined,
    command: { tournamentId: string; tablesList: { tableNumber: TableNumber; tableName: string }[] },
    currentTime: Date,
    entityIdGenerator: EntityIdGenerator,
): DomainCommandResult<TournamentTable[]> {
    if (state !== undefined && state.length > 0) {
        throw new Error('Some tables are already assigned to that tournament.');
    }
    if (command.tablesList.length === 0) {
        throw new Error('Tournament must have at least 1 table assigned.');
    }

    const tournamentTables: TournamentTable[] = command.tablesList.map(table => {
        const tableId = entityIdGenerator.generate();
        return new TournamentTable({
            tournamentId: command.tournamentId,
            tableId: TableId.from(tableId),
            tableNumber: table.tableNumber,
            tableName: table.tableName
        });
    });

    const tournamentTablesWereAssigned = new TournamentTablesWereAssigned({
        occurredAt: currentTime,
        tablesAssigned: tournamentTables
    });

    const assignedTablesToTournament = onTournamentTablesWereAssigned(state, tournamentTablesWereAssigned);

    return {
        state: assignedTablesToTournament,
        events: [tournamentTablesWereAssigned],
    };
}

function onTournamentTablesWereAssigned(state: TournamentTable[] | undefined, event: TournamentTablesWereAssigned): TournamentTable[] {
    return event.tablesAssigned.map(table => new TournamentTable(table));
}