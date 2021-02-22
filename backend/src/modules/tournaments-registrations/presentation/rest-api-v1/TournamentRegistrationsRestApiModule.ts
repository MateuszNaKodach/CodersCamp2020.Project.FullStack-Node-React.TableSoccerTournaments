import { CommandBus } from '../../../../shared/core/application/command/CommandBus';
import { DomainEventBus } from '../../../../shared/core/application/event/DomainEventBus';
import { QueryBus } from '../../../../shared/core/application/query/QueryBus';
import { ModuleRestApi } from '../../../../shared/infrastructure/restapi/ModuleRestApi';
import { tournamentRegistrationsRouter } from './TournamentRegistrationsRouter';

export function TournamentRegistrationsRestApiModule(commandBus: CommandBus, eventBus: DomainEventBus, queryBus: QueryBus): ModuleRestApi {
  return {
    router: tournamentRegistrationsRouter(commandBus, eventBus, queryBus),
    path: '/tournament-registrations',
  };
}
