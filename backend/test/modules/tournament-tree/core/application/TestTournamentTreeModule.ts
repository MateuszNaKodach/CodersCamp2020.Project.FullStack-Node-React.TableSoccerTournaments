import { TestModuleCore, testModuleCore } from '../../../../test-support/shared/core/TestModuleCore';
import { DoublesTournamentModuleCore } from '../../../../../src/modules/doubles-tournament/core/DoublesTournamentModuleCore';
import { EntityIdGenerator } from '../../../../../src/shared/core/application/EntityIdGenerator';
import {InMemoryTournamentTreeRepository} from "../../../../../src/modules/tournament-tree/infrastructure/repository/inmemory/InMemoryTournamentTreeRepository";
import {TournamentTreeModuleCore} from "../../../../../src/modules/tournament-tree/core/TournamentTreeModuleCore";
// import { InMemoryDoublesTournamentRepository } from '';

export function testTournamentTreeModule(currentTime: Date, entityIdGenerator: EntityIdGenerator): TestModuleCore {
  const tournamentTreeRepository = new InMemoryTournamentTreeRepository();
  // return testModuleCore((commandBus, eventBus,/* queryBus*/) =>
  return testModuleCore((commandBus, eventBus, queryBus) =>
      TournamentTreeModuleCore(eventBus, commandBus, () => currentTime, entityIdGenerator, tournamentTreeRepository),
  );
}
