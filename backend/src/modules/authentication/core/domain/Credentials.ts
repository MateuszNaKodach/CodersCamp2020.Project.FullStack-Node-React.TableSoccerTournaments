import {Password} from "./Password";
import {Login} from "./Login";

export class Credentials {
  readonly login: Login;
  readonly password: Password;

  constructor(props: { login: Login, password: Password }) {
    this.login = props.login;
    this.password = props.password;
  }
}
