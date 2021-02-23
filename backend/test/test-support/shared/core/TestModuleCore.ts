import { ModuleCore } from '../../../../src/shared/core/ModuleCore';
import { InMemoryDomainEventBus } from '../../../../src/shared/infrastructure/core/application/event/InMemoryDomainEventBus';
import { InMemoryQueryBus } from '../../../../src/shared/infrastructure/core/application/query/InMemoryQueryBus';
import { StoreAndForwardDomainEventBus } from '../../../../src/shared/infrastructure/core/application/event/StoreAndForwardDomainEventBus';
import { DomainEvent } from '../../../../src/shared/domain/event/DomainEvent';
import { CommandBus } from '../../../../src/shared/core/application/command/CommandBus';
import { DomainEventBus } from '../../../../src/shared/core/application/event/DomainEventBus';
import { QueryBus } from '../../../../src/shared/core/application/query/QueryBus';
import { Command } from '../../../../src/shared/core/application/command/Command';
import { CommandResult } from '../../../../src/shared/core/application/command/CommandResult';
import { Query } from '../../../../src/shared/core/application/query/Query';
import { InMemoryCommandBus } from '../../../../src/shared/infrastructure/core/application/command/InMemoryCommandBus';

export type TestModuleCore = {
  lastPublishedEvent(): DomainEvent | undefined;
  publishEvent(event: DomainEvent): void;
  executeCommand<CommandType extends Command>(command: CommandType): Promise<CommandResult>;
  executeQuery<ResultType = any, QueryType extends Query = Query>(query: QueryType): Promise<ResultType>;
};

export type ModuleCoreFactory = (commandBus: CommandBus, eventBus: DomainEventBus, queryBus: QueryBus) => ModuleCore;

export function testModuleCore(
  moduleCoreFactory: ModuleCoreFactory,
  commandBus: CommandBus = new InMemoryCommandBus(),
  eventBus: StoreAndForwardDomainEventBus = new StoreAndForwardDomainEventBus(new InMemoryDomainEventBus()),
  queryBus: QueryBus = new InMemoryQueryBus(),
) {
  const moduleCore = moduleCoreFactory(commandBus, eventBus, queryBus);
  moduleCore.commandHandlers.forEach((commandHandler) => commandBus.registerHandler(commandHandler.commandType, commandHandler.handler));
  moduleCore.eventHandlers.forEach((eventHandler) => eventBus.registerHandler(eventHandler.eventType, eventHandler.handler));
  moduleCore.queryHandlers.forEach((queryHandler) => queryBus.registerHandler(queryHandler.queryType, queryHandler.handler));

  return {
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
}
