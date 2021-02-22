import { CommandBus } from './application/command/CommandBus';
import { QueryBus } from './application/query/QueryBus';
import { DomainEventBus } from './application/event/DomainEventBus';
import { AppModule } from './AppModule';

export function initializeAppModules(commandBus: CommandBus, eventBus: DomainEventBus, queryBus: QueryBus, appModules: AppModule[] = []) {
  appModules.forEach((appModule) => {
    appModule.commandHandlers.forEach((commandHandler) => commandBus.registerHandler(commandHandler.commandType, commandHandler.handler));
    appModule.eventHandlers.forEach((eventHandler) => eventBus.registerHandler(eventHandler.eventType, eventHandler.handler));
    appModule.queryHandlers.forEach((queryHandler) => queryBus.registerHandler(queryHandler.queryType, queryHandler.handler));
  });
}
