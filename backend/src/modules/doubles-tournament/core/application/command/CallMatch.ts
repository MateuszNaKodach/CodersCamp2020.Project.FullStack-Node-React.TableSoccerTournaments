export class CallMatch {
  readonly tournamentId: string;
  readonly matchFromQueue: { matchNumber: number; team1Id: string; team2Id: string };
  readonly tableNumber: number;

  constructor(props: {
    tournamentId: string;
    matchFromQueue: { matchNumber: number; team1Id: string; team2Id: string };
    tableNumber: number;
  }) {
    this.tournamentId = props.tournamentId;
    this.matchFromQueue = props.matchFromQueue;
    this.tableNumber = props.tableNumber;
  }
}
