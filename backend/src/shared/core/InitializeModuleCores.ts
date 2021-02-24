import { CommandBus } from './application/command/CommandBus';
import { QueryBus } from './application/query/QueryBus';
import { DomainEventBus } from './application/event/DomainEventBus';
import { ModuleCore } from './ModuleCore';

export function initializeModuleCores(
  commandBus: CommandBus,
  eventBus: DomainEventBus,
  queryBus: QueryBus,
  appModules: ModuleCore[] = [],
): void {
  appModules.forEach((appModule) => {
    appModule.commandHandlers.forEach((commandHandler) => commandBus.registerHandler(commandHandler.commandType, commandHandler.handler));
    appModule.eventHandlers.forEach((eventHandler) => eventBus.registerHandler(eventHandler.eventType, eventHandler.handler));
    appModule.queryHandlers.forEach((queryHandler) => queryBus.registerHandler(queryHandler.queryType, queryHandler.handler));
  });
}
