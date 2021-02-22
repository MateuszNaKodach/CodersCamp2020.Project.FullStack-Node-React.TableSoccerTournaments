import { AppModule } from '../../../../../src/modules/shared/AppModule';
import { InMemoryDomainEventBus } from '../../../../../src/modules/shared/infrastructure/event/InMemoryDomainEventBus';
import { InMemoryQueryBus } from '../../../../../src/modules/shared/infrastructure/query/InMemoryQueryBus';
import { StoreAndForwardDomainEventBus } from '../../../../../src/modules/shared/infrastructure/event/StoreAndForwardDomainEventBus';
import { DomainEvent } from '../../../../../src/modules/shared/domain/event/DomainEvent';
import { CommandBus } from '../../../../../src/modules/shared/application/command/CommandBus';
import { DomainEventBus } from '../../../../../src/modules/shared/application/event/DomainEventBus';
import { QueryBus } from '../../../../../src/modules/shared/application/query/QueryBus';
import { Command } from '../../../../../src/modules/shared/application/command/Command';
import { CommandResult } from '../../../../../src/modules/shared/application/command/CommandResult';
import { Query } from '../../../../../src/modules/shared/application/query/Query';
import { InMemoryCommandBus } from '../../../../../src/modules/shared/infrastructure/command/InMemoryCommandBus';

export type TestModule = {
  readonly appModule: AppModule;
  lastPublishedEvent(): DomainEvent | undefined;
  publishEvent(event: DomainEvent): void;
  executeCommand<CommandType extends Command>(command: CommandType): Promise<CommandResult>;
  executeQuery<ResultType = any, QueryType extends Query = Query>(query: QueryType): Promise<ResultType>;
};

export type AppModuleFactory = (commandBus: CommandBus, eventBus: DomainEventBus, queryBus: QueryBus) => AppModule;

export const testModule: (
  appModuleFactory: AppModuleFactory,
  commandBus?: CommandBus,
  eventBus?: StoreAndForwardDomainEventBus,
  queryBus?: QueryBus,
) => TestModule = (
  appModuleFactory: AppModuleFactory,
  commandBus: CommandBus = new InMemoryCommandBus(),
  eventBus: StoreAndForwardDomainEventBus = new StoreAndForwardDomainEventBus(new InMemoryDomainEventBus()),
  queryBus: QueryBus = new InMemoryQueryBus(),
) => {
  const appModule = appModuleFactory(commandBus, eventBus, queryBus);
  appModule.commandHandlers.forEach((commandHandler) => commandBus.registerHandler(commandHandler.commandType, commandHandler.handler));
  appModule.eventHandlers.forEach((eventHandler) => eventBus.registerHandler(eventHandler.eventType, eventHandler.handler));
  appModule.queryHandlers.forEach((queryHandler) => queryBus.registerHandler(queryHandler.queryType, queryHandler.handler));

  return {
    appModule,
    publishEvent(event: DomainEvent): void {
      eventBus.publish(event);
    },
    lastPublishedEvent(): DomainEvent | undefined {
      return eventBus.storedEvents.reverse()[0];
    },
    executeCommand<CommandType extends Command>(command: CommandType): Promise<CommandResult> {
      return commandBus.execute(command);
    },
    executeQuery<ResultType = any, QueryType extends Query = Query>(query: QueryType): Promise<ResultType> {
      return queryBus.execute(query);
    },
  };
};
