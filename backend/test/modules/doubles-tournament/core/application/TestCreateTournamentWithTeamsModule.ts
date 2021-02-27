import { TestModuleCore, testModuleCore } from '../../../../test-support/shared/core/TestModuleCore';
import { DoublesTournamentModuleCore } from '../../../../../src/modules/doubles-tournament/core/DoublesTournamentModuleCore';
import { EntityIdGenerator } from '../../../../../src/shared/core/application/EntityIdGenerator';
import { InMemoryDoublesTournamentRepository } from '../../../../../src/modules/doubles-tournament/core/infrastructure/repository/inmemory/InMemoryDoublesTournamentRepository';

export function testCreateTournamentWithTeamsModule(currentTime: Date, entityIdGenerator: EntityIdGenerator): TestModuleCore {
  const doublesTournamentRepository = new InMemoryDoublesTournamentRepository();
  return testModuleCore((commandBus, eventBus, queryBus) =>
    DoublesTournamentModuleCore(eventBus, commandBus, () => currentTime, entityIdGenerator, doublesTournamentRepository),
  );
}
