import { TournamentRegistrationsRepository } from '../../../../../../src/modules/tournaments-registrations/core/application/TournamentRegistrationsRepository';
import { MongoTestSupport } from '../../../../../test-support/shared/infrastructure/MongooseTestSupport';
import { TournamentTablesRepositoryTestCases } from '../TournamentTablesRepositoryTestCases';
import { MongoTournamentTablesRepository } from '../../../../../../src/modules/tournament-tables/infrastructure/repository/mongo/MongoTournamentTablesRepository';

describe('TournamentRegistrationsRepository', () => {
  TournamentTablesRepositoryTestCases({
    name: 'MongoDb Implementation',
    repositoryFactory: () => new MongoTournamentTablesRepository(),
    databaseTestSupport: MongoTestSupport,
  });
});
