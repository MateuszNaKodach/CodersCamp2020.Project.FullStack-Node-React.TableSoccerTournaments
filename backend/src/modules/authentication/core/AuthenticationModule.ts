import { AppModule } from '../../shared/AppModule';
import { CredentialsRepository } from './application/command/CredentialsRepository';
import { CreateCredentialsCommandHandler } from './application/command/CreateCredentialsCommandHandler';

export const AuthenticationModule: (credentialsRepository: CredentialsRepository) => AppModule = (
  credentialsRepository: CredentialsRepository,
) => {
  return {
    commandHandlers: [new CreateCredentialsCommandHandler(credentialsRepository)],
    eventHandlers: [],
    queryHandlers: [],
  };
};
