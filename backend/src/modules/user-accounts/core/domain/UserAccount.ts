export class UserAccount {
  readonly userId: string;
  readonly email: string;

  constructor(props: { userId: string; email: string }) {
    this.userId = props.userId;
    this.email = props.email;
  }
}
