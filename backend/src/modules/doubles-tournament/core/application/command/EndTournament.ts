export class EndTournament {
  readonly tournamentId: string;
  readonly winner: string;

  constructor(props: { tournamentId: string; winner: string }) {
    this.tournamentId = props.tournamentId;
    this.winner = props.winner;
  }
}
