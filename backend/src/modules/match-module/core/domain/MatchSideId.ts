export class MatchSideId {
  private readonly TYPE = 'MatchSideId';

  private constructor(readonly raw: string) {}

  static from(matchSideId: string): MatchSideId {
    if (matchSideId.length <= 0) {
      throw new Error('MatchSideId cannot be empty!');
    }
    return new MatchSideId(matchSideId);
  }
}
