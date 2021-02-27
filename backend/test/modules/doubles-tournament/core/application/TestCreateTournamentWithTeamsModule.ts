import { TestModuleCore, testModuleCore } from '../../../../test-support/shared/core/TestModuleCore';
import { DoublesTournamentModuleCore } from '../../../../../src/modules/doubles-tournament/core/DoublesTournamentModuleCore';
import { EntityIdGeneratorStub } from '../../../../test-support/shared/core/EntityIdGeneratorStub';

export function testCreateTournamentWithTeamsModule(currentTime: Date): TestModuleCore {
  const entityGen = EntityIdGeneratorStub('TeamId');
  return testModuleCore((commandBus, eventBus, queryBus) =>
    DoublesTournamentModuleCore(eventBus, commandBus, () => currentTime, entityGen),
  );
}
