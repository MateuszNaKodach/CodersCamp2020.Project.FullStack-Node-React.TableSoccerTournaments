import { CommandPublisher } from "../../../../shared/core/application/command/CommandBus";
import { DomainEventPublisher } from "../../../../shared/core/application/event/DomainEventBus";
import { QueryPublisher } from "../../../../shared/core/application/query/QueryBus";
import { ModuleRestApi } from "../../../../shared/presentation/rest-api/ModuleRestApi";
import { tournamentTablesRouter } from "./TournamentTablesRouter";

export function tournamentTablesRestApiModule(
  commandPublisher: CommandPublisher,
  eventPublisher: DomainEventPublisher,
  queryPublisher: QueryPublisher
): ModuleRestApi {
  return {
    router: tournamentTablesRouter(commandPublisher, eventPublisher, queryPublisher),
    path: 'tournaments'
  }
}