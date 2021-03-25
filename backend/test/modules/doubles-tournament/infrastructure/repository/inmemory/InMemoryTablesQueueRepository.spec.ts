import { InMemoryTestSupport } from '../../../../../test-support/shared/infrastructure/InMemoryTestSupport';
import { InMemoryTablesQueueRepository } from '../../../../../../src/modules/doubles-tournament/infrastructure/repository/inmemory/InMemoryTablesQueueRepository';
import { TablesQueueRepositoryTestCases } from '../TablesQueueRepositoryTestCases';

describe('TablesQueueRepository', () => {
  TablesQueueRepositoryTestCases({
    name: 'In Memory Implementation',
    repositoryFactory: () => new InMemoryTablesQueueRepository(),
    databaseTestSupport: InMemoryTestSupport,
  });
});
