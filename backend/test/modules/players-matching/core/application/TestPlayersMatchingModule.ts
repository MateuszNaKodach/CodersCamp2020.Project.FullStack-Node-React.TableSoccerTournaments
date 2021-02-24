import { TestModuleCore, testModuleCore } from '../../../../test-support/shared/core/TestModuleCore';
import { PlayersMatchingModuleCore } from '../../../../../src/modules/players-matching/core/PlayersMatchingModuleCore';

export function testPlayersMatchingModule(currentTime: Date): TestModuleCore {
  return testModuleCore((commandBus, eventBus, queryBus) => PlayersMatchingModuleCore(eventBus, commandBus, () => currentTime));
}
