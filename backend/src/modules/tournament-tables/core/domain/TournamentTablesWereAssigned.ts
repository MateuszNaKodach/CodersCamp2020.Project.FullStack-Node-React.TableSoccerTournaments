import { DomainEvent } from '../../../../shared/domain/event/DomainEvent';
import {TableNumber} from "./TableNumber";
import {TableId} from "./TableId";

export class TournamentTablesWereAssigned implements DomainEvent {
    readonly occurredAt: Date;
    readonly tableAssigned: { tournamentId: string; tableId: TableId; tableNumber: TableNumber; tableName: string }[];

    constructor(props: { occurredAt: Date; tournamentId: string; tableId: TableId; tableNumber: TableNumber; tableName: string }[]) {
        this.tableAssigned = props;
    }
}
