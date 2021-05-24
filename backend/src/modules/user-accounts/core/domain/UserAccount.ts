export class UserAccount {
  readonly userId: string;
  readonly email: string;
  readonly password: string | undefined;

  constructor(props: { userId: string; email: string; password: string | undefined }) {
    this.userId = props.userId;
    this.email = props.email;
    this.password = props.password;
  }
}
