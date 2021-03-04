import { MongoTestSupport } from '../../../../../test-support/shared/infrastructure/MongooseTestSupport';
import { PlayerProfilesRepositoryTestCases } from '../PlayerProfilesRepositoryTestCases';
import { MongoPlayerProfileRepository } from '../../../../../../src/modules/player-profiles/infrastructure/repository/mongo/MongoPlayerProfileRepository';

describe('PlayersProfilesRepository', () => {
  PlayerProfilesRepositoryTestCases({
    name: 'MongoDb Implementation',
    repositoryFactory: () => new MongoPlayerProfileRepository(),
    databaseTestSupport: MongoTestSupport,
  });
});
