import { InMemoryTournamentRegistrationsRepository } from '../../../../../src/modules/tournaments-registrations/infrastructure/repository/inmemory/InMemoryTournamentRegistrationsRepository';
import { InMemoryPlayers } from '../../../../../src/modules/tournaments-registrations/infrastructure/repository/inmemory/InMemoryPlayers';
import { testModuleCore } from '../../../../test-support/shared/core/TestModuleCore';
import { TournamentsRegistrationsModuleCore } from '../../../../../src/modules/tournaments-registrations/core/TournamentsRegistrationsModuleCore';

export function testTournamentsRegistrationsModule(currentTime: Date) {
  const tournamentRegistrationsRepository = new InMemoryTournamentRegistrationsRepository();
  const inMemoryPlayers = new InMemoryPlayers();
  return testModuleCore((commandBus, eventBus, queryBus) =>
    TournamentsRegistrationsModuleCore(eventBus, () => currentTime, tournamentRegistrationsRepository, inMemoryPlayers, inMemoryPlayers),
  );
}
