export class MatchPlayersToTeams {
  readonly tournamentId: string;
  readonly registeredPlayersIds: string[];

  constructor(tournamentId: string, registeredPlayersIds: string[]) {
    this.tournamentId = tournamentId;
    this.registeredPlayersIds = registeredPlayersIds;
  }
}
