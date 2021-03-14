export class MatchesQueueDto {
  readonly tournamentId;
  readonly queue: {
    matchNumber: number;
    team1Id: string;
    team2Id: string;
  }[];

  constructor(tournamentId: string, queue: { matchNumber: number; team1Id: string; team2Id: string }[]) {
    this.tournamentId = tournamentId;
    this.queue = queue;
  }
}
