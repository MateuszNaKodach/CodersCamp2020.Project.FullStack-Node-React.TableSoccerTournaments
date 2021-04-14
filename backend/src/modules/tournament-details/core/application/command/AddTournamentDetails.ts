export class AddTournamentDetails {
  readonly tournamentId: string;
  readonly tournamentName: string;

  constructor(props: { tournamentId: string; tournamentName: string }) {
    this.tournamentId = props.tournamentId;
    this.tournamentName = props.tournamentName;
  }
}
