export class TournamentTreeWasCreated {
  readonly tournamentId: string;
  readonly occurredAt: Date;

  constructor(tournamentId: string, occurredAt: Date) {
    this.tournamentId = tournamentId;
    this.occurredAt = occurredAt;
  }
}
