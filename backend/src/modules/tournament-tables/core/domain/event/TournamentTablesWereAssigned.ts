import {DomainEvent} from '../../../../../shared/domain/event/DomainEvent';
import {TournamentTable} from "../TournamentTable";

export class TournamentTablesWereAssigned implements DomainEvent {
    readonly occurredAt: Date;
    readonly tablesAssigned: TournamentTable[];

    constructor(props: { occurredAt: Date; tablesAssigned: TournamentTable[] }) {
        this.occurredAt = props.occurredAt;
        this.tablesAssigned = props.tablesAssigned;
    }
}
