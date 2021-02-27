import { TestModuleCore, testModuleCore } from '../../../../test-support/shared/core/TestModuleCore';
import { DoublesTournamentModuleCore } from '../../../../../src/modules/doubles-tournament/core/DoublesTournamentModuleCore';

export function testCreateTournamentWithTeamsModule(currentTime: Date): TestModuleCore {
  //TODO it must use some kind of repository for test to work properly
  return testModuleCore((commandBus, eventBus, queryBus) => DoublesTournamentModuleCore(eventBus, commandBus, () => currentTime));
}
