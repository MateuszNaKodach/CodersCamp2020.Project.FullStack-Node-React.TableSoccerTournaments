export class UserId {
  private readonly TYPE = 'UserId';

  private constructor(readonly raw: string) {}

  static from(userId: string): UserId {
    if (userId.length <= 0) {
      throw new Error('UserId cannot be empty!');
    }
    return new UserId(userId);
  }
}
