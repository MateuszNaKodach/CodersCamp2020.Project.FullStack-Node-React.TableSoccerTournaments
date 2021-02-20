export class Login {
  private readonly TYPE = 'Login';

  private constructor(readonly raw: string) {}

  static from(login: string) {
    if (login.length <= 0) {
      throw new Error('Login cannot be empty!');
    }
    return new Login(login);
  }
}
