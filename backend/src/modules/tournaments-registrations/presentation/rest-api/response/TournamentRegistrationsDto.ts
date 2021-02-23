export class TournamentRegistrationsDto {
  readonly tournamentId: string;
  readonly status: string;
  readonly registeredPlayersIds: string[];

  constructor(tournamentId: string, status: string, registeredPlayersIds: string[]) {
    this.tournamentId = tournamentId;
    this.status = status;
    this.registeredPlayersIds = registeredPlayersIds;
  }
}
