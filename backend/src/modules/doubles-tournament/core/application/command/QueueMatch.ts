export class QueueMatch {
  readonly tournamentId: string;
  readonly matchNumber: number;
  readonly team1Id: string;
  readonly team2Id: string;

  constructor(props: { tournamentId: string; matchNumber: number; team1Id: string; team2Id: string }) {
    this.tournamentId = props.tournamentId;
    this.matchNumber = props.matchNumber;
    this.team1Id = props.team1Id;
    this.team2Id = props.team2Id;
  }
}
