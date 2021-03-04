import { DomainEvent } from '../../../../../shared/domain/event/DomainEvent';
import {TableNumber} from "../TableNumber";
import {TableId} from "../TableId";
import {TournamentTable} from "../TournamentTable";

export class TournamentTablesWereAssigned implements DomainEvent {
    readonly occurredAt: Date;
    readonly tablesAssigned: { tournamentId: string; tableId: TableId; tableNumber: TableNumber; tableName: string }[];

    constructor(props: { occurredAt: Date; tablesAssigned: TournamentTable[] }) {
        this.occurredAt = props.occurredAt;
        this.tablesAssigned = props.tablesAssigned;
    }
}
