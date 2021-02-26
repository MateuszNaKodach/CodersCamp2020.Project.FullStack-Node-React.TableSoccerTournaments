import { TournamentRegistrationsRepository } from '../../../../../../src/modules/tournaments-registrations/core/application/TournamentRegistrationsRepository';
import { MongoTournamentRegistrationsRepository } from '../../../../../../src/modules/tournaments-registrations/infrastructure/repository/mongo/MongoTournamentRegistrationsRepository';
import { MongoTestSupport } from '../../../../../test-support/shared/infrastructure/MongooseTestSupport';
import { TournamentRegistrationsRepositoryTestCases } from '../TournamentRegistrationsRepositoryTestCases';

describe('TournamentRegistrationsRepository', () => {
  TournamentRegistrationsRepositoryTestCases({
    name: 'MongoDb Implementation',
    repositoryFactory: () => new MongoTournamentRegistrationsRepository(),
    databaseTestSupport: MongoTestSupport,
  });
});
