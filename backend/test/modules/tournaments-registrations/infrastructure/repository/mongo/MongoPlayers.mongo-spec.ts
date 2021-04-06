import { MongoTestSupport } from '../../../../../test-support/shared/infrastructure/MongooseTestSupport';
import { PlayersTestCases } from '../PlayersTestCases';
import { MongoPlayers } from '../../../../../../src/modules/tournaments-registrations/infrastructure/repository/mongo/MongoPlayers';

describe('Players & AvailablePlayersForTournament', () => {
  PlayersTestCases({
    name: 'MongoDb Implementation',
    repositoryFactory: () => new MongoPlayers(),
    databaseTestSupport: MongoTestSupport,
  });
});
