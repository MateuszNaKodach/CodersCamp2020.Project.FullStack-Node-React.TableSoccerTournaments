import { TournamentRegistrationsRepository } from '../../../../../../src/modules/tournaments-registrations/core/application/TournamentRegistrationsRepository';
import { TournamentRegistrationsRepositoryTestCases } from '../TournamentRegistrationsRepositoryTestCases';
import { InMemoryTournamentRegistrationsRepository } from '../../../../../../src/modules/tournaments-registrations/infrastructure/repository/inmemory/InMemoryTournamentRegistrationsRepository';
import { InMemoryTestSupport } from '../../../../../test-support/shared/infrastructure/InMemoryTestSupport';

describe('TournamentRegistrationsRepository', () => {
  TournamentRegistrationsRepositoryTestCases({
    name: 'InMemory Implementation',
    repositoryFactory: () => new InMemoryTournamentRegistrationsRepository(),
    databaseTestSupport: InMemoryTestSupport,
  });
});
