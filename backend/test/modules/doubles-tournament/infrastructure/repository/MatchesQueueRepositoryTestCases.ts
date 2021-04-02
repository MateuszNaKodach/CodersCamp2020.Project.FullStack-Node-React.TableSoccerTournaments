import { MatchesQueueRepository } from '../../../../../src/modules/doubles-tournament/core/application/MatchesQueueRepository';
import { DatabaseTestSupport } from '../../../../test-support/shared/infrastructure/DatabaseTestSupport';
import { EntityIdGenerator } from '../../../../../src/shared/core/application/EntityIdGenerator';
import { UuidEntityIdGenerator } from '../../../../../src/shared/infrastructure/core/application/UuidEntityIdGenerator';
import { QueuedMatch } from '../../../../../src/modules/doubles-tournament/core/domain/QueuedMatch';
import { MatchNumber } from '../../../../../src/modules/doubles-tournament/core/domain/MatchNumber';
import { TeamId } from '../../../../../src/modules/doubles-tournament/core/domain/TeamId';
import { MatchesQueue } from '../../../../../src/modules/doubles-tournament/core/domain/MatchesQueue';
import { TournamentId } from '../../../../../src/modules/doubles-tournament/core/domain/TournamentId';

export function MatchesQueueRepositoryTestCases(props: {
  name: string;
  repositoryFactory: () => MatchesQueueRepository;
  databaseTestSupport: DatabaseTestSupport;
}): void {
  return describe(props.name, () => {
    const entityIdGenerator: EntityIdGenerator = new UuidEntityIdGenerator();
    const tournamentId = TournamentId.from(entityIdGenerator.generate());
    let repository: MatchesQueueRepository;

    beforeAll(async () => {
      await props.databaseTestSupport.openConnection();
      repository = props.repositoryFactory();
    });
    afterEach(async () => await props.databaseTestSupport.clearDatabase());
    afterAll(async () => await props.databaseTestSupport.closeConnection());

    test('findByTournamentId returns matches queue with given tournament id when it was created and saved', async () => {
      const queue: QueuedMatch[] = [
        new QueuedMatch({
          matchNumber: MatchNumber.from(1),
          team1Id: TeamId.from(entityIdGenerator.generate()),
          team2Id: TeamId.from(entityIdGenerator.generate()),
        }),
        new QueuedMatch({
          matchNumber: MatchNumber.from(2),
          team1Id: TeamId.from(entityIdGenerator.generate()),
          team2Id: TeamId.from(entityIdGenerator.generate()),
        }),
      ];
      const matchesQueue = new MatchesQueue({
        tournamentId: tournamentId,
        queuedMatches: queue,
      });

      await repository.save(matchesQueue);

      expect(await repository.findByTournamentId(tournamentId.raw)).toStrictEqual(matchesQueue);
    });

    test('findByTournamentId returns undefined when given tournament id when it was not found', async () => {
      const queue: QueuedMatch[] = [
        new QueuedMatch({
          matchNumber: MatchNumber.from(1),
          team1Id: TeamId.from(entityIdGenerator.generate()),
          team2Id: TeamId.from(entityIdGenerator.generate()),
        }),
        new QueuedMatch({
          matchNumber: MatchNumber.from(2),
          team1Id: TeamId.from(entityIdGenerator.generate()),
          team2Id: TeamId.from(entityIdGenerator.generate()),
        }),
      ];
      const matchesQueue = new MatchesQueue({
        tournamentId: tournamentId,
        queuedMatches: queue,
      });

      await repository.save(matchesQueue);

      const notSavedTournamentId = entityIdGenerator.generate();
      expect(await repository.findByTournamentId(notSavedTournamentId)).toBeUndefined();
    });
  });
}
