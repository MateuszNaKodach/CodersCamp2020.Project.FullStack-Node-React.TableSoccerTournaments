import { testModuleCore, TestModuleCore } from '../../../../test-support/shared/core/TestModuleCore';
import { MatchModuleCore } from '../../../../../src/modules/match-module/core/MatchModuleCore';
import { InMemoryMatchRepository } from '../../../../../src/modules/match-module/infrastructure/repository/inmemory/InMemoryMatchRepository';

export function testMatchModule(currentTime: Date): TestModuleCore {
  const matchRepository = new InMemoryMatchRepository();
  return testModuleCore((commandBus, eventBus, queryBus) => MatchModuleCore(eventBus, commandBus, () => currentTime, matchRepository));
}
