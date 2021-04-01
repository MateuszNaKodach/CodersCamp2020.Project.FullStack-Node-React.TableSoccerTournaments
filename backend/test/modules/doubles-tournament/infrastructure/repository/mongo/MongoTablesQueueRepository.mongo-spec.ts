import { MongoTestSupport } from '../../../../../test-support/shared/infrastructure/MongooseTestSupport';
import { TablesQueueRepositoryTestCases } from '../TablesQueueRepositoryTestCases';
import { MongoTablesQueueRepository } from '../../../../../../src/modules/doubles-tournament/infrastructure/repository/mongo/MongoTablesQueueRepository';

describe('TablesQueueRepository', () => {
  TablesQueueRepositoryTestCases({
    name: 'MongoDb Implementation',
    repositoryFactory: () => new MongoTablesQueueRepository(),
    databaseTestSupport: MongoTestSupport,
  });
});
