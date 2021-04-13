import { MongoTestSupport } from '../../../../test-support/shared/infrastructure/MongooseTestSupport';
import { TournamentDetailsRepositoryTestCases } from '../TournamentDetailsRepositoryTestCases';
import { MongoTournamentDetailsRepository } from '../../../../../src/modules/tournament-details/infrastructure/repository/mongo/MongoTournamentDetailsRepository';

describe('TournamentDetailsRepository', () => {
  TournamentDetailsRepositoryTestCases({
    name: 'MongoDb Implementation',
    repositoryFactory: () => new MongoTournamentDetailsRepository(),
    databaseTestSupport: MongoTestSupport,
  });
});
