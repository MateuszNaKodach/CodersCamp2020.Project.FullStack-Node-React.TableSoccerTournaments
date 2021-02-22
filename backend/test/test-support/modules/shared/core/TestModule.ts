import {AppModule} from "../../../../../src/modules/shared/AppModule";
import {InMemoryCommandBus} from "../../../../../src/modules/shared/infrastructure/command/InMemoryCommandBus";
import {InMemoryDomainEventBus} from "../../../../../src/modules/shared/infrastructure/event/InMemoryDomainEventBus";
import {InMemoryQueryBus} from "../../../../../src/modules/shared/infrastructure/query/InMemoryQueryBus";
import {StoreAndForwardDomainEventBus} from "../../../../../src/modules/shared/infrastructure/event/StoreAndForwardDomainEventBus";
import {DomainEvent} from "../../../../../src/modules/shared/domain/event/DomainEvent";
import {CommandBus} from "../../../../../src/modules/shared/application/command/CommandBus";
import {DomainEventBus} from "../../../../../src/modules/shared/application/event/DomainEventBus";
import {QueryBus} from "../../../../../src/modules/shared/application/query/QueryBus";

export type TestModule = {
  readonly eventBus: StoreAndForwardDomainEventBus;
  readonly commandBus: InMemoryCommandBus;
  readonly queryBus: InMemoryQueryBus
}

export type AppModuleFactory = (commandBus: CommandBus, eventBus: DomainEventBus, queryBus: QueryBus) => AppModule

export const testModule: (appModuleFactory: AppModuleFactory) => TestModule = (appModuleFactory: AppModuleFactory) => {
  const commandBus = new InMemoryCommandBus()
  const eventBus = new StoreAndForwardDomainEventBus(new InMemoryDomainEventBus());
  const queryBus = new InMemoryQueryBus();

  const appModule = appModuleFactory(commandBus, eventBus, queryBus)
  appModule.commandHandlers
      .forEach(commandHandler => commandBus.registerHandler(commandHandler.commandType, commandHandler.handler))
  appModule.eventHandlers
      .forEach(eventHandler => eventBus.registerHandler(eventHandler.eventType, eventHandler.handler))
  appModule.queryHandlers
      .forEach(queryHandler => queryBus.registerHandler(queryHandler.queryType, queryHandler.handler))

  return {
    commandBus,
    eventBus,
    queryBus
  }
}

export function lastPublishedEventFrom(testModule: TestModule): DomainEvent | undefined {
  return testModule.eventBus.storedEvents.reverse()[0]
}
