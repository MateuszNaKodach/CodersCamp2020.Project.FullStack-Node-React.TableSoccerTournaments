export class FindCredentialsByLogin {
  readonly login: string;

  constructor(props: { login: string }) {
    this.login = props.login;
  }
}
