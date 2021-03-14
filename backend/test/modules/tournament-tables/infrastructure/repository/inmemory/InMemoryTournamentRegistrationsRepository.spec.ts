import { TournamentTablesRepositoryTestCases } from '../TournamentTablesRepositoryTestCases';
import { InMemoryTestSupport } from '../../../../../test-support/shared/infrastructure/InMemoryTestSupport';
import { InMemoryTournamentTablesRepository } from '../../../../../../src/modules/tournament-tables/infrastructure/repository/inmemory/InMemoryTournamentTablesRepository';

describe('TournamentTablesRepository', () => {
  TournamentTablesRepositoryTestCases({
    name: 'In Memory Implementation',
    repositoryFactory: () => new InMemoryTournamentTablesRepository(),
    databaseTestSupport: InMemoryTestSupport,
  });
});
