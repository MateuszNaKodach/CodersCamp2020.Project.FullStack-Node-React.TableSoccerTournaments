import { TestModuleCore, testModuleCore } from '../../../../test-support/shared/core/TestModuleCore';
import { EntityIdGenerator } from '../../../../../src/shared/core/application/EntityIdGenerator';
import { InMemoryTournamentTreeRepository } from '../../../../../src/modules/tournament-tree/infrastructure/repository/inmemory/InMemoryTournamentTreeRepository';
import { TournamentTreeModuleCore } from '../../../../../src/modules/tournament-tree/core/TournamentTreeModuleCore';

export function testTournamentTreeModule(currentTime: Date, entityIdGenerator: EntityIdGenerator): TestModuleCore {
  const tournamentTreeRepository = new InMemoryTournamentTreeRepository();
  return testModuleCore((commandBus, eventBus, queryBus) =>
    TournamentTreeModuleCore(eventBus, commandBus, () => currentTime, entityIdGenerator, tournamentTreeRepository),
  );
}
