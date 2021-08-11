import { InMemoryTestSupport } from '../../../../../test-support/shared/infrastructure/InMemoryTestSupport';
import { InMemoryAuthenticationRepository } from '../../../../../../src/modules/authentication/infrastructure/repository/inmemory/InMemoryAuthenticationRepository';
import { AuthenticationRepositoryTestCases } from '../AuthenticationRepositoryTestCases';

describe('AuthenticationRepository', () => {
  AuthenticationRepositoryTestCases({
    name: 'In Memory Implementation',
    repositoryFactory: () => new InMemoryAuthenticationRepository(),
    databaseTestSupport: InMemoryTestSupport,
  });
});
