import { DomainEvent } from '../../../../../shared/domain/event/DomainEvent';
import { TournamentTable } from '../TournamentTable';

export class TableWasIncludedInAvailableTables implements DomainEvent {
  readonly occurredAt: Date;
  readonly tableIncluded: TournamentTable;

  constructor(props: { occurredAt: Date; tableIncluded: TournamentTable }) {
    this.occurredAt = props.occurredAt;
    this.tableIncluded = props.tableIncluded;
  }
}
