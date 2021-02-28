import { playerProfileRouter } from './PlayerProfileRouter';
import { QueryPublisher } from '../../../../shared/core/application/query/QueryBus';
import { ModuleRestApi } from '../../../../shared/presentation/rest-api/ModuleRestApi';

export function PlayerProfileRestApiModule(queryPublisher: QueryPublisher): ModuleRestApi {
  return {
    router: playerProfileRouter(queryPublisher),
    path: '/players-profiles',
  };
}
