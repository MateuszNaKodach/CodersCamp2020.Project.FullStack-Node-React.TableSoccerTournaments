export class PlayerId {
  private readonly TYPE = 'PlayerId';

  private constructor(readonly raw: string) {}

  static from(playerId: string): PlayerId {
    if (playerId.length <= 0) {
      throw new Error('Player id cannot be empty!');
    }
    return new PlayerId(playerId);
  }
}
