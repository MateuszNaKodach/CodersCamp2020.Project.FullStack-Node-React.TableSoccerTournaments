import { testModuleCore, TestModuleCore } from '../../../../test-support/shared/core/TestModuleCore';
import { PlayerProfilesModuleCore } from '../../../../../src/modules/player-profiles/core/PlayerProfilesModuleCore';
import { InMemoryPlayerProfileRepository } from '../../../../../src/modules/player-profiles/infrastructure/repository/inmemory/InMemoryPlayerProfileRepository';

export function testPlayerProfileModule(currentTime: Date): TestModuleCore {
  const playerProfilesRepository = new InMemoryPlayerProfileRepository();
  return testModuleCore((commandBus, eventBus, queryBus) =>
    PlayerProfilesModuleCore(eventBus, commandBus, () => currentTime, playerProfilesRepository),
  );
}
