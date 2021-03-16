import { DomainEvent } from '../../../../../shared/domain/event/DomainEvent';
import { TournamentTable } from '../TournamentTable';

export class TableWasExcludedFromAvailableTables implements DomainEvent {
  readonly occurredAt: Date;
  readonly tableExcluded: TournamentTable;

  constructor(props: { occurredAt: Date; tableExcluded: TournamentTable }) {
    this.occurredAt = props.occurredAt;
    this.tableExcluded = props.tableExcluded;
  }
}
