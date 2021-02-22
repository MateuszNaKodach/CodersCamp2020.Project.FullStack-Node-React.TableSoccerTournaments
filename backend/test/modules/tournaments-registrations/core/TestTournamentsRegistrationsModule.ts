import { InMemoryTournamentRegistrationsRepository } from '../../../../src/modules/tournaments-registrations/infrastructure/repository/inmemory/InMemoryTournamentRegistrationsRepository';
import { InMemoryPlayers } from '../../../../src/modules/tournaments-registrations/infrastructure/repository/inmemory/InMemoryPlayers';
import { testModule } from '../../../test-support/modules/shared/core/TestModule';
import { TournamentsRegistrationsModuleCore } from '../../../../src/modules/tournaments-registrations/core/TournamentsRegistrationsModuleCore';

export function testTournamentsRegistrationsModule(currentTime: Date) {
  const tournamentRegistrationsRepository = new InMemoryTournamentRegistrationsRepository();
  const inMemoryPlayers = new InMemoryPlayers();
  return testModule((commandBus, eventBus, queryBus) =>
    TournamentsRegistrationsModuleCore(eventBus, () => currentTime, tournamentRegistrationsRepository, inMemoryPlayers, inMemoryPlayers),
  );
}
