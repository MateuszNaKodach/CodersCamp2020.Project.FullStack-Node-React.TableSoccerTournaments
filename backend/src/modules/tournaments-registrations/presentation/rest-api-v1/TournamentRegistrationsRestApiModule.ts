import { CommandBus } from '../../../../shared/core/application/command/CommandBus';
import { DomainEventBus } from '../../../../shared/core/application/event/DomainEventBus';
import { QueryBus } from '../../../../shared/core/application/query/QueryBus';
import { RestApiModule } from '../../../../shared/infrastructure/restapi/RestApiModule';
import { tournamentRegistrationsRouter } from './TournamentRegistrationsRouter';

export function TournamentRegistrationsRestApiModule(commandBus: CommandBus, eventBus: DomainEventBus, queryBus: QueryBus): RestApiModule {
  return {
    router: tournamentRegistrationsRouter(commandBus, eventBus, queryBus),
    path: '/tournament-registrations',
  };
}
