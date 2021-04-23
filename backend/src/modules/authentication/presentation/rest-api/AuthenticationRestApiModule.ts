import { CommandPublisher } from '../../../../shared/core/application/command/CommandBus';
import { ModuleRestApi } from '../../../../shared/presentation/rest-api/ModuleRestApi';
import { authenticationRouter } from './AuthenticationRouter';

export function authenticationRestApiModule(commandPublisher: CommandPublisher): ModuleRestApi {
  return {
    router: authenticationRouter(commandPublisher),
    path: '/auth',
  };
}
