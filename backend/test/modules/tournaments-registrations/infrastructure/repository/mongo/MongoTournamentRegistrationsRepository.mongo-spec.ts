import {
  clearTestMongoDb,
  closeTestMongoDbConnection,
  openTestMongoDbConnection,
} from '../../../../../test-support/shared/infrastructure/MongooseTestSupport';
import { TournamentRegistrationsRepository } from '../../../../../../src/modules/tournaments-registrations/core/application/TournamentRegistrationsRepository';
import { MongoTournamentRegistrationsRepository } from '../../../../../../src/modules/tournaments-registrations/infrastructure/repository/mongo/MongoTournamentRegistrationsRepository';
import { TournamentId } from '../../../../../../src/modules/tournaments-registrations/core/domain/TournamentId';
import { TournamentRegistrations } from '../../../../../../src/modules/tournaments-registrations/core/domain/TournamentRegistrations';
import { RegistrationsStatus } from '../../../../../../src/modules/tournaments-registrations/core/domain/RegistrationsStatus';
import { PlayerId } from '../../../../../../src/modules/tournaments-registrations/core/domain/PlayerId';

describe('MongoTournamentRegistrationsRepository', () => {
  const repository: TournamentRegistrationsRepository = new MongoTournamentRegistrationsRepository();

  beforeAll(async () => {
    await openTestMongoDbConnection();
  });
  afterEach(async () => await clearTestMongoDb());
  afterAll(async () => await closeTestMongoDbConnection());

  test('findAll returns empty list when nothing was saved', async () => {
    expect(await repository.findAll()).toBeEmpty();
  });

  test('findAll returns all saved tournament registrations', async () => {
    const tournamentRegistrations1 = new TournamentRegistrations({ tournamentId: TournamentId.from('TournamentId1') });
    const tournamentRegistrations2 = new TournamentRegistrations({
      tournamentId: TournamentId.from('TournamentId2'),
      status: RegistrationsStatus.OPENED,
      registeredPlayers: [PlayerId.from('1'), PlayerId.from('2')],
    });

    await repository.save(tournamentRegistrations1);
    await repository.save(tournamentRegistrations2);

    expect(await repository.findAll()).toStrictEqual([tournamentRegistrations1, tournamentRegistrations2]);
  });

  test('findByTournamentId returns undefined when tournament with given id is not saved', async () => {
    const tournamentRegistrations1 = new TournamentRegistrations({ tournamentId: TournamentId.from('TournamentId1') });
    const tournamentRegistrations2 = new TournamentRegistrations({
      tournamentId: TournamentId.from('TournamentId2'),
      status: RegistrationsStatus.OPENED,
      registeredPlayers: [PlayerId.from('1'), PlayerId.from('2')],
    });

    await repository.save(tournamentRegistrations1);
    await repository.save(tournamentRegistrations2);

    expect(await repository.findByTournamentId(TournamentId.from('NotExistingId'))).toBeUndefined();
  });

  test('findByTournamentId returns tournament registrations with given id when were saved', async () => {
    const tournamentRegistrations1 = new TournamentRegistrations({ tournamentId: TournamentId.from('TournamentId1') });
    const tournamentRegistrations2 = new TournamentRegistrations({
      tournamentId: TournamentId.from('TournamentId2'),
      status: RegistrationsStatus.OPENED,
      registeredPlayers: [PlayerId.from('1'), PlayerId.from('2')],
    });

    await repository.save(tournamentRegistrations1);
    await repository.save(tournamentRegistrations2);

    expect(await repository.findByTournamentId(TournamentId.from('TournamentId1'))).toStrictEqual(tournamentRegistrations1);
  });
});
