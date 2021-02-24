export class TournamentId {
  private readonly TYPE = 'TournamentId';

  private constructor(readonly raw: string) {}

  static from(tournamentId: string): TournamentId {
    if (tournamentId.length <= 0) {
      throw new Error('TournamentId cannot be empty!');
    }
    return new TournamentId(tournamentId);
  }
}
