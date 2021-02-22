import {AppModule} from "../../../../../src/modules/shared/AppModule";
import {InMemoryCommandBus} from "../../../../../src/modules/shared/infrastructure/command/InMemoryCommandBus";
import {InMemoryDomainEventBus} from "../../../../../src/modules/shared/infrastructure/event/InMemoryDomainEventBus";
import {InMemoryQueryBus} from "../../../../../src/modules/shared/infrastructure/query/InMemoryQueryBus";
import {StoreAndForwardDomainEventBus} from "../../../../../src/modules/shared/infrastructure/event/StoreAndForwardDomainEventBus";
import {DomainEvent} from "../../../../../src/modules/shared/domain/event/DomainEvent";

export type TestModule = {
  readonly eventBus: StoreAndForwardDomainEventBus;
  readonly commandBus: InMemoryCommandBus;
  readonly queryBus: InMemoryQueryBus
}

export const testModule: (appModule: AppModule) => TestModule = (appModule: AppModule) => {
  const commandBus = new InMemoryCommandBus()
  const eventBus = new StoreAndForwardDomainEventBus(new InMemoryDomainEventBus());
  const queryBus = new InMemoryQueryBus();

  appModule.commandHandlers
      .forEach(commandHandler => commandBus.registerHandler(commandHandler.commandType, commandHandler.handler))
  appModule.eventHandlers
      .forEach(eventHandler => eventBus.registerHandler(eventHandler.eventType, eventHandler.handler))
  appModule.queryHandlers
      .forEach(queryHandler => queryBus.registerHandler(queryHandler.queryType, queryHandler.handler))

  //TODO: Execute command, mock method etc.
  return {
    commandBus,
    eventBus,
    queryBus
  }
}

export function lastPublishedEventFrom(testModule: TestModule): DomainEvent | undefined {
  return testModule.eventBus.storedEvents.reverse()[0]
}
