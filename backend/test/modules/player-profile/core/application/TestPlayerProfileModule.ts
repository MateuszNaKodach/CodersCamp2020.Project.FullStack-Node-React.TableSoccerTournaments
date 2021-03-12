import { ModuleCoreFactory, testModuleCore, TestModuleCore } from '../../../../test-support/shared/core/TestModuleCore';
import { PlayerProfilesModuleCore } from '../../../../../src/modules/player-profiles/core/PlayerProfilesModuleCore';
import { InMemoryPlayerProfileRepository } from '../../../../../src/modules/player-profiles/infrastructure/repository/inmemory/InMemoryPlayerProfileRepository';
import { CommandBus } from '../../../../../src/shared/core/application/command/CommandBus';
import { InMemoryCommandBus } from '../../../../../src/shared/infrastructure/core/application/command/InMemoryCommandBus';

export function testPlayerProfileModule(currentTime: Date, commandBus: CommandBus = new InMemoryCommandBus()): TestModuleCore {
  const playerProfilesRepository = new InMemoryPlayerProfileRepository();
  const moduleCoreFactory: ModuleCoreFactory = (commandBus, eventBus, queryBus) =>
    PlayerProfilesModuleCore(eventBus, commandBus, () => currentTime, playerProfilesRepository);
  return testModuleCore(moduleCoreFactory, commandBus);
}
