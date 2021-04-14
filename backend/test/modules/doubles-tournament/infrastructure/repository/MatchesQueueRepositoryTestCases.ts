import { MatchesQueueRepository } from '../../../../../src/modules/doubles-tournament/core/application/MatchesQueueRepository';
import { DatabaseTestSupport } from '../../../../test-support/shared/infrastructure/DatabaseTestSupport';
import { EntityIdGenerator } from '../../../../../src/shared/core/application/EntityIdGenerator';
import { UuidEntityIdGenerator } from '../../../../../src/shared/infrastructure/core/application/UuidEntityIdGenerator';
import { QueuedMatch } from '../../../../../src/modules/doubles-tournament/core/domain/QueuedMatch';
import { MatchNumber } from '../../../../../src/modules/doubles-tournament/core/domain/MatchNumber';
import { TeamId } from '../../../../../src/modules/doubles-tournament/core/domain/TeamId';
import { MatchesQueue } from '../../../../../src/modules/doubles-tournament/core/domain/MatchesQueue';
import { TournamentId } from '../../../../../src/modules/doubles-tournament/core/domain/TournamentId';
import { MatchStatus } from '../../../../../src/modules/doubles-tournament/core/domain/MatchStatus';
import { OptimisticLockingException } from '../../../../../src/shared/core/application/OptimisticLockingException';

export function MatchesQueueRepositoryTestCases(props: {
  name: string;
  repositoryFactory: () => MatchesQueueRepository;
  databaseTestSupport: DatabaseTestSupport;
}): void {
  return describe(props.name, () => {
    const entityIdGenerator: EntityIdGenerator = new UuidEntityIdGenerator();
    let repository: MatchesQueueRepository;
    const queue: QueuedMatch[] = [
      new QueuedMatch({
        matchNumber: MatchNumber.from(1),
        team1Id: TeamId.from(entityIdGenerator.generate()),
        team2Id: TeamId.from(entityIdGenerator.generate()),
        status: MatchStatus.ENDED,
        tableNumber: 5,
      }),
      new QueuedMatch({
        matchNumber: MatchNumber.from(2),
        team1Id: TeamId.from(entityIdGenerator.generate()),
        team2Id: TeamId.from(entityIdGenerator.generate()),
        status: MatchStatus.ENQUEUED,
      }),
    ];
    const tournamentId = TournamentId.from(entityIdGenerator.generate());
    const matchesQueue = new MatchesQueue({
      tournamentId: tournamentId,
      queuedMatches: queue,
    });

    beforeAll(async () => {
      await props.databaseTestSupport.openConnection();
    });
    beforeEach(() => {
      repository = props.repositoryFactory();
    });
    afterEach(async () => await props.databaseTestSupport.clearDatabase());
    afterAll(async () => await props.databaseTestSupport.closeConnection());

    test('findByTournamentId returns matches queue with given tournament id when it was created and saved', async () => {
      await repository.save(matchesQueue, 0);
      expect(await repository.findByTournamentId(tournamentId.raw)).toStrictEqual({ state: matchesQueue, version: 1 });
    });

    test('findByTournamentId returns undefined when given tournament id when it was not found', async () => {
      await repository.save(matchesQueue, 0);
      const notSavedTournamentId = entityIdGenerator.generate();
      expect(await repository.findByTournamentId(notSavedTournamentId)).toStrictEqual({ state: undefined, version: 0 });
    });

    test('optimistic locking | pass', async () => {
      await repository.save(matchesQueue, 0);
      expect(await repository.findByTournamentId(tournamentId.raw)).toStrictEqual({ state: matchesQueue, version: 1 });

      await repository.save(matchesQueue, 1);
      expect(await repository.findByTournamentId(tournamentId.raw)).toStrictEqual({ state: matchesQueue, version: 2 });
    });

    test('optimistic locking | fail', async () => {
      await repository.save(matchesQueue, 0);
      expect(await repository.findByTournamentId(tournamentId.raw)).toStrictEqual({ state: matchesQueue, version: 1 });

      await expect(repository.save(matchesQueue, 0)).rejects.toStrictEqual(new OptimisticLockingException(0));
      expect(await repository.findByTournamentId(tournamentId.raw)).toStrictEqual({ state: matchesQueue, version: 1 });
    });
  });
}
