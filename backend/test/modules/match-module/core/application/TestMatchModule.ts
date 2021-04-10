import { ModuleCoreFactory, testModuleCore, TestModuleCore } from '../../../../test-support/shared/core/TestModuleCore';
import { MatchModuleCore } from '../../../../../src/modules/match-module/core/MatchModuleCore';
import { InMemoryMatchRepository } from '../../../../../src/modules/match-module/infrastructure/repository/inmemory/InMemoryMatchRepository';
import { CommandBus } from '../../../../../src/shared/core/application/command/CommandBus';
import { InMemoryCommandBus } from '../../../../../src/shared/infrastructure/core/application/command/InMemoryCommandBus';
import { StoreAndForwardDomainEventBus } from '../../../../../src/shared/infrastructure/core/application/event/StoreAndForwardDomainEventBus';
import { InMemoryDomainEventBus } from '../../../../../src/shared/infrastructure/core/application/event/InMemoryDomainEventBus';

export function testMatchModule(
  currentTime: Date,
  commandBus: CommandBus = new InMemoryCommandBus(),
  eventBus: StoreAndForwardDomainEventBus = new StoreAndForwardDomainEventBus(new InMemoryDomainEventBus()),
): TestModuleCore {
  const matchRepository = new InMemoryMatchRepository();
  const moduleCoreFactory: ModuleCoreFactory = (commandBus, eventBus, queryBus) =>
    MatchModuleCore(eventBus, commandBus, () => currentTime, matchRepository);
  return testModuleCore(moduleCoreFactory, commandBus, eventBus);
}
