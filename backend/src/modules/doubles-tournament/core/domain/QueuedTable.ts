import { TablesQueue } from './TablesQueue';
import { TournamentId } from './TournamentId';

export class QueuedTable {
  readonly tableNumber: number;
  readonly isFree: boolean;

  constructor(props: { tableNumber: number; isFree: boolean }) {
    this.tableNumber = props.tableNumber;
    this.isFree = props.isFree;
  }
}

export function pushTableToQueue(
  tournamentId: TournamentId,
  tournamentTable: { tableNumber: number; isFree: boolean },
  queue: TablesQueue | undefined,
): TablesQueue {
  if (!queue) {
    queue = new TablesQueue({
      tournamentId: tournamentId,
      queuedTables: [],
    });
  }

  const tableToPush = new QueuedTable({
    tableNumber: tournamentTable.tableNumber,
    isFree: tournamentTable.isFree,
  });

  return queue.withEnqueuedTables(tableToPush);
}
