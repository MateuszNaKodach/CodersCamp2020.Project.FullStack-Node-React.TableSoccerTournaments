export class MatchId {
  private readonly TYPE = 'MatchId';

  private constructor(readonly raw: string) {}

  static from(tournamentId: string, matchNumber: number): MatchId {
    if (tournamentId.length <= 0) {
      throw new Error('TournamentId cannot be empty!');
    }
    return new MatchId(tournamentId + '_' + matchNumber);
  }
}
