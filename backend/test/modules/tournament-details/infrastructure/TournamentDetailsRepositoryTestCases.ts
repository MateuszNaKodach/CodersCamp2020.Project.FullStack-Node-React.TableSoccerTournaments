import { TournamentDetailsRepository } from '../../../../src/modules/tournament-details/core/application/TournamentDetailsRepository';
import { TournamentDetails } from '../../../../src/modules/tournament-details/core/domain/TournamentDetails';
import { TournamentName } from '../../../../src/modules/tournament-details/core/domain/TournamentName';
import { DatabaseTestSupport } from '../../../test-support/shared/infrastructure/DatabaseTestSupport';
import { UuidEntityIdGenerator } from '../../../../src/shared/infrastructure/core/application/UuidEntityIdGenerator';
import { EntityIdGenerator } from '../../../../src/shared/core/application/EntityIdGenerator';

export function TournamentDetailsRepositoryTestCases(props: {
  name: string;
  repositoryFactory: () => TournamentDetailsRepository;
  databaseTestSupport: DatabaseTestSupport;
}): void {
  return describe(props.name, () => {
    const entityIdGenerator: EntityIdGenerator = new UuidEntityIdGenerator();
    let repository: TournamentDetailsRepository;

    beforeAll(async () => {
      await props.databaseTestSupport.openConnection();
      repository = props.repositoryFactory();
    });
    afterEach(async () => await props.databaseTestSupport.clearDatabase());
    afterAll(async () => await props.databaseTestSupport.closeConnection());

    test('findAll returns empty list when nothing was saved', async () => {
      expect(await repository.findAll()).toBeEmpty();
    });

    test('findAll returns all saved tournament registrations', async () => {
      const tournamentId1 = entityIdGenerator.generate();
      const tournamentName1 = TournamentName.from('Name1');
      const tournamentId2 = entityIdGenerator.generate();
      const tournamentName2 = TournamentName.from('Name2');
      const tournamentDetails1 = new TournamentDetails({
        tournamentId: tournamentId1,
        tournamentName: tournamentName1,
      });
      const tournamentDetails2 = new TournamentDetails({
        tournamentId: tournamentId2,
        tournamentName: tournamentName2,
      });

      await repository.save(tournamentDetails1);
      await repository.save(tournamentDetails2);

      expect(await repository.findAll()).toStrictEqual([tournamentDetails1, tournamentDetails2]);
    });
  });
}
