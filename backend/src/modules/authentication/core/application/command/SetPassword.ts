export class SetPassword {
  readonly userId: string;
  readonly password: string;

  constructor(userId: string, password: string) {
    this.userId = userId;
    this.password = password;
  }
}
