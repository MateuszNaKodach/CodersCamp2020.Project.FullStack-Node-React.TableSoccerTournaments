import { CommandHandler } from '../../../../shared/application/command/CommandHandler';
import { CreateCredentials } from './CreateCredentials';
import { CommandResult } from '../../../../shared/application/command/CommandResult';
import { CredentialsRepository } from './CredentialsRepository';
import { Credentials } from '../../domain/Credentials';
import { Login } from '../../domain/Login';
import { Password } from '../../domain/Password';

export class CreateCredentialsCommandHandler implements CommandHandler<CreateCredentials> {
  constructor(private readonly credentialsRepository: CredentialsRepository) {}

  async execute(command: CreateCredentials): Promise<CommandResult> {
    const credentials = new Credentials({
      login: Login.from(command.login),
      password: Password.from(command.password),
    });
    await this.credentialsRepository.save(credentials);
    return CommandResult.success();
  }
}
