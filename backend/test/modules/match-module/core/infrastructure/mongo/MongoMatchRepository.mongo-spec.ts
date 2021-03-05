import { MatchRepositoryTestCases } from '../MatchRepositoryTestCases';
import { MongoTestSupport } from '../../../../../test-support/shared/infrastructure/MongooseTestSupport';
import { MongoMatchRepository } from '../../../../../../src/modules/match-module/infrastructure/repository/mongo/MongoMatchRepository';

describe('Mongo Match Repository', () => {
  MatchRepositoryTestCases({
    name: 'Mongo Implementation',
    repositoryFactory: () => new MongoMatchRepository(),
    databaseTestSupport: MongoTestSupport,
  });
});
