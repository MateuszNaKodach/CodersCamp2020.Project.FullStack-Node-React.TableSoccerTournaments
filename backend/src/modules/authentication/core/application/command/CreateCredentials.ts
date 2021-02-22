import { Command } from '../../../../../shared/core/application/command/Command';

export class CreateCredentials implements Command {
  readonly login: string;
  readonly password: string;

  constructor(props: { credentialsId: string; login: string; password: string }) {
    this.login = props.login;
    this.password = props.password;
  }
}
