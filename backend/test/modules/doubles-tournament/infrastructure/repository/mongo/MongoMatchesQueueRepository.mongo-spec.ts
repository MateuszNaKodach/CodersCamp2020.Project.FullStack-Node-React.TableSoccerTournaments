import { MongoTestSupport } from '../../../../../test-support/shared/infrastructure/MongooseTestSupport';
import { MatchesQueueRepositoryTestCases } from '../MatchesQueueRepositoryTestCases';
import { MongoMatchesQueueRepository } from '../../../../../../src/modules/doubles-tournament/infrastructure/repository/mongo/MongoMatchesQueueRepository';

describe('MatchesQueueRepository', () => {
  MatchesQueueRepositoryTestCases({
    name: 'MongoDb Implementation',
    repositoryFactory: () => new MongoMatchesQueueRepository(),
    databaseTestSupport: MongoTestSupport,
  });
});
