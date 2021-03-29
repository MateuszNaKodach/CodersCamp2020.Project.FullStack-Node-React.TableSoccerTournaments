import { TournamentId } from './TournamentId';
import { QueuedTable } from './QueuedTable';

export class TablesQueue {
  readonly tournamentId: TournamentId;
  readonly queuedTables: QueuedTable[];

  constructor(props: { tournamentId: TournamentId; queuedTables: QueuedTable[] }) {
    this.tournamentId = props.tournamentId;
    this.queuedTables = props.queuedTables;
  }

  withEnqueuedTables(table: QueuedTable): TablesQueue {
    const queue = this.queuedTables.filter(queuedTable => queuedTable.tableNumber !== table.tableNumber);
    return new TablesQueue({
      tournamentId: this.tournamentId,
      queuedTables: [...queue, table],
    });
  }
}
