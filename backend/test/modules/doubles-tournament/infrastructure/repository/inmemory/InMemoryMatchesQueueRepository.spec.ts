import { InMemoryTestSupport } from '../../../../../test-support/shared/infrastructure/InMemoryTestSupport';
import { MatchesQueueRepositoryTestCases } from '../MatchesQueueRepositoryTestCases';
import { InMemoryMatchesQueueRepository } from '../../../../../../src/modules/doubles-tournament/infrastructure/repository/inmemory/InMemoryMatchesQueueRepository';

describe('MatchesQueueRepository', () => {
  MatchesQueueRepositoryTestCases({
    name: 'In Memory Implementation',
    repositoryFactory: () => new InMemoryMatchesQueueRepository(),
    databaseTestSupport: InMemoryTestSupport,
  });
});
