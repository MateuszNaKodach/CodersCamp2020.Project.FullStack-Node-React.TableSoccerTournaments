import { TournamentId } from './TournamentId';
import { QueuedTable } from './QueuedTable';

export class TablesQueue {
  readonly tournamentId: TournamentId;
  readonly queuedTables: QueuedTable[];

  constructor(props: { tournamentId: TournamentId; queuedTables: QueuedTable[] }) {
    this.tournamentId = props.tournamentId;
    this.queuedTables = props.queuedTables;
  }
}
