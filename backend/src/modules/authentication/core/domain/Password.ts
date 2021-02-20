export class Password {
  private readonly TYPE = 'Password';

  private constructor(readonly raw: string) {}

  static from(password: string) {
    if (password.length <= 4) {
      throw new Error('Password min length is 4 characters!');
    }
    return new Password(password);
  }
}
