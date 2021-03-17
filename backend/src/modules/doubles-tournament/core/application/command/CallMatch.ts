export class CallMatch {
  readonly tournamentId: string;
  readonly matchFromQueue: { matchNumber: number; team1Id: string; team2Id: string };
  readonly table: { tableNumber: number; tableName: string; availableToPlay: boolean };

  constructor(props: {
    tournamentId: string;
    tableId: string;
    matchFromQueue: { matchNumber: number; team1Id: string; team2Id: string };
    table: { tableNumber: number; tableName: string; availableToPlay: boolean };
  }) {
    this.tournamentId = props.tournamentId;
    this.matchFromQueue = props.matchFromQueue;
    this.table = props.table;
  }
}
