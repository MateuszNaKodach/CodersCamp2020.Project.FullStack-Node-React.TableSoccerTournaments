import { testModuleCore, TestModuleCore } from '../../../../test-support/shared/core/TestModuleCore';
import { InMemoryTournamentDetailsRepository } from '../../../../../src/modules/tournament-details/infrastructure/repository/inmemory/InMemoryTournamentDetailsRepository';
import { TournamentDetailsModuleCore } from '../../../../../src/modules/tournament-details/core/TournamentDetailsModuleCore';

export function testTournamentsDetailsModule(currentTime: Date): TestModuleCore {
  const tournamentDetailsRepository = new InMemoryTournamentDetailsRepository();
  return testModuleCore((commandBus, eventBus, queryBus) =>
    TournamentDetailsModuleCore(eventBus, commandBus, () => currentTime, tournamentDetailsRepository),
  );
}
