import { PlayersTestCases } from '../PlayersTestCases';
import { InMemoryPlayers } from '../../../../../../src/modules/tournaments-registrations/infrastructure/repository/inmemory/InMemoryPlayers';
import { InMemoryTestSupport } from '../../../../../test-support/shared/infrastructure/InMemoryTestSupport';

describe('Players & AvailablePlayersForTournament', () => {
  PlayersTestCases({
    name: 'InMemory Implementation',
    repositoryFactory: () => new InMemoryPlayers(),
    databaseTestSupport: InMemoryTestSupport,
  });
});
