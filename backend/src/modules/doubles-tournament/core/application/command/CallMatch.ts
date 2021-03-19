export class CallMatch {
  readonly tournamentId: string;
  readonly calledMatch: { matchNumber: number; team1Id: string; team2Id: string };
  readonly tableNumber: number;

  constructor(props: {
    tournamentId: string;
    calledMatch: { matchNumber: number; team1Id: string; team2Id: string };
    tableNumber: number;
  }) {
    this.tournamentId = props.tournamentId;
    this.calledMatch = props.calledMatch;
    this.tableNumber = props.tableNumber;
  }
}
