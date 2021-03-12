import { DoublesTournamentRepositoryTestCases } from '../DoublesTournamentRepositoryTestCases';
import { InMemoryDoublesTournamentRepository } from '../../../../../../src/modules/doubles-tournament/infrastructure/repository/inmemory/InMemoryDoublesTournamentRepository';
import { InMemoryTestSupport } from '../../../../../test-support/shared/infrastructure/InMemoryTestSupport';

describe('DoublesTournamentRepository', () => {
  DoublesTournamentRepositoryTestCases({
    name: 'In Memory Implementation',
    repositoryFactory: () => new InMemoryDoublesTournamentRepository(),
    databaseTestSupport: InMemoryTestSupport,
  });
});
