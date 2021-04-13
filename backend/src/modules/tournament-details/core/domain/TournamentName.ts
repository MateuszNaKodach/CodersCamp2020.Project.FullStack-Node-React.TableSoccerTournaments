export class TournamentName {
  private readonly TYPE = 'TournamentName';

  private constructor(readonly raw: string) {}

  static from(tournamentName: string): TournamentName {
    if (tournamentName.length < 3) {
      throw new Error('Tournament name must have at least 3 characters.');
    }
    return new TournamentName(tournamentName);
  }
}
