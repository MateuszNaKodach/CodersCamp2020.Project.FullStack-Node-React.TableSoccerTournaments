import { MongoTestSupport } from '../../../../../test-support/shared/infrastructure/MongooseTestSupport';
import { TournamentTablesRepositoryTestCases } from '../TournamentTablesRepositoryTestCases';
import { MongoTournamentTablesRepository } from '../../../../../../src/modules/tournament-tables/infrastructure/repository/mongo/MongoTournamentTablesRepository';

describe('TournamentTablesRepository', () => {
  TournamentTablesRepositoryTestCases({
    name: 'MongoDb Implementation',
    repositoryFactory: () => new MongoTournamentTablesRepository(),
    databaseTestSupport: MongoTestSupport,
  });
});
