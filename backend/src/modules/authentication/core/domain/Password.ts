export class Password {
  private readonly TYPE = 'Password';

  private constructor(readonly raw: string) {}

  static from(password: string): Password {
    if (password.length <= 5) {
      throw new Error('Password cannot be shorter than 5 signs!');
    }

    return new Password(password);
  }
}
