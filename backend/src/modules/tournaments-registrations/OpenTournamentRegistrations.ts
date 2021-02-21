export class OpenTournamentRegistrations {
  readonly tournamentId: string

  static command(props: { tournamentId: string }): OpenTournamentRegistrations {
    return new OpenTournamentRegistrations(props);
  }

  private constructor(props: { tournamentId: string }) {
    this.tournamentId = props.tournamentId;
  }


}
