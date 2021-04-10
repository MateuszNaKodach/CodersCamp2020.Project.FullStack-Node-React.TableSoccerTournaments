export class StartTournament {
  readonly tournamentId: string;

  constructor(props: { tournamentId: string }) {
    this.tournamentId = props.tournamentId;
  }
}
