import { InMemoryTournamentRegistrationsRepository } from '../../../../src/modules/tournaments-registrations/infrastructure/repository/inmemory/InMemoryTournamentRegistrationsRepository';
import { InMemoryPlayers } from '../../../../src/modules/tournaments-registrations/infrastructure/repository/inmemory/InMemoryPlayers';
import { testModule } from '../../../test-support/modules/shared/core/TestModule';
import { TournamentsRegistrationsModule } from '../../../../src/modules/tournaments-registrations/core/TournamentsRegistrationsModule';

export function testTournamentsRegistrationsModule(currentTime: Date) {
  const tournamentRegistrationsRepository = new InMemoryTournamentRegistrationsRepository();
  const inMemoryPlayers = new InMemoryPlayers();
  return testModule((commandBus, eventBus, queryBus) =>
    TournamentsRegistrationsModule(eventBus, () => currentTime, tournamentRegistrationsRepository, inMemoryPlayers, inMemoryPlayers),
  );
}
