import { DoublesTournamentRepositoryTestCases } from '../DoublesTournamentRepositoryTestCases';
import { MongoTestSupport } from '../../../../../../test-support/shared/infrastructure/MongooseTestSupport';
import { MongoDoublesTournamentRepository } from '../../../../../../../src/modules/doubles-tournament/core/infrastructure/repository/mongo/MongoDoublesTournamentRepository';

describe('DoublesTournamentRepository', () => {
  DoublesTournamentRepositoryTestCases({
    name: 'MongoDb Implementation',
    repositoryFactory: () => new MongoDoublesTournamentRepository(),
    databaseTestSupport: MongoTestSupport,
  });
});
