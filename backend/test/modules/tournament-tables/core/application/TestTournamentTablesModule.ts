import { testModuleCore, TestModuleCore } from '../../../../test-support/shared/core/TestModuleCore';
import { TournamentTablesModuleCore } from '../../../../../src/modules/tournament-tables/core/TournamentTablesModuleCore';
import { InMemoryTournamentTablesRepository } from '../../../../../src/modules/tournament-tables/infrastructure/repository/inmemory/InMemoryTournamentTablesRepository';

export function testTournamentTablesModule(currentTime: Date): TestModuleCore {
  const tournamentTablesRepository = new InMemoryTournamentTablesRepository();
  return testModuleCore((commandBus, eventBus, queryBus) =>
    TournamentTablesModuleCore(eventBus, commandBus, () => currentTime, tournamentTablesRepository),
  );
}
