import { DomainEvent } from '../../../../shared/domain/event/DomainEvent';

export class TablesWereAssignedToTournament implements DomainEvent {
    readonly occurredAt: Date;
    readonly tableAssigned: { tournamentId: string; tableId: string, tableName: string }[];

    constructor(props: { occurredAt: Date; tournamentId: string; tableId: string, tableName: string }[]) {
        this.tableAssigned = props;
    }
}
