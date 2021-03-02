import { playerProfileRouter } from './PlayerProfileRouter';
import { QueryPublisher } from '../../../../shared/core/application/query/QueryBus';
import { ModuleRestApi } from '../../../../shared/presentation/rest-api/ModuleRestApi';
import { CommandPublisher } from '../../../../shared/core/application/command/CommandBus';

export function PlayerProfileRestApiModule(commandPublisher: CommandPublisher, queryPublisher: QueryPublisher): ModuleRestApi {
  return {
    router: playerProfileRouter(commandPublisher, queryPublisher),
    path: '/players-profiles',
  };
}
