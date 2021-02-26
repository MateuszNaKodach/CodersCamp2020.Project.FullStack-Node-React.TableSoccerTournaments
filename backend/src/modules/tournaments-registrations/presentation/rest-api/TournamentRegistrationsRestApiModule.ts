import { CommandPublisher } from '../../../../shared/core/application/command/CommandBus';
import { DomainEventPublisher } from '../../../../shared/core/application/event/DomainEventBus';
import { QueryPublisher } from '../../../../shared/core/application/query/QueryBus';
import { ModuleRestApi } from '../../../../shared/presentation/rest-api/ModuleRestApi';
import { tournamentRegistrationsRouter } from './TournamentRegistrationsRouter';
import { EntityIdGenerator } from '../../../../shared/core/application/EntityIdGenerator';

export function TournamentRegistrationsRestApiModule(
  commandPublisher: CommandPublisher,
  eventPublisher: DomainEventPublisher,
  queryPublisher: QueryPublisher,
  entityIdGenerator: EntityIdGenerator,
): ModuleRestApi {
  return {
    router: tournamentRegistrationsRouter(commandPublisher, eventPublisher, queryPublisher, entityIdGenerator),
    path: '/tournament-registrations',
  };
}
