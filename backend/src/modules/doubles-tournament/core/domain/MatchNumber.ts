export class MatchNumber {
  private readonly TYPE = 'MatchNumber';

  private constructor(readonly raw: number) {}

  static from(matchNumber: number): MatchNumber {
    if (matchNumber <= 0) {
      throw new Error('Such match number is incorrect!');
    }
    return new MatchNumber(matchNumber);
  }
}