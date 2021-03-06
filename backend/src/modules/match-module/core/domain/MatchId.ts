export class MatchId {
  private readonly TYPE = 'MatchId';

  private constructor(readonly raw: string) {}

  static from(matchId: string): MatchId {
    if (matchId.length <= 0) {
      throw new Error('MatchId cannot be empty!');
    }
    return new MatchId(matchId);
  }
}
