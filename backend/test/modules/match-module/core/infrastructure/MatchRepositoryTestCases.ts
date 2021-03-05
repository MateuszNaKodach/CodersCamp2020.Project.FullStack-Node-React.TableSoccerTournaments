import { MatchRepository } from '../../../../../src/modules/match-module/core/application/MatchRepository';
import { DatabaseTestSupport } from '../../../../test-support/shared/infrastructure/DatabaseTestSupport';
import { Match } from '../../../../../src/modules/match-module/core/domain/Match';
import { MatchId } from '../../../../../src/modules/match-module/core/domain/MatchId';
import { MatchSideId } from '../../../../../src/modules/match-module/core/domain/MatchSideId';

export function MatchRepositoryTestCases(props: {
  name: string;
  repositoryFactory: () => MatchRepository;
  databaseTestSupport: DatabaseTestSupport;
}): void {
  return describe(props.name, () => {
    let repository: MatchRepository;

    beforeAll(async () => {
      await props.databaseTestSupport.openConnection();
      repository = props.repositoryFactory();
    });
    afterEach(async () => await props.databaseTestSupport.clearDatabase());
    afterAll(async () => await props.databaseTestSupport.closeConnection());

    test('findAll returns empty list when no matches were started', async () => {
      expect(await repository.findAll()).toBeEmpty();
    });

    test('findAll returns all matches that were started', async () => {
      const matchId1 = MatchId.from('matchId1');
      const firstMatchSideId1 = MatchSideId.from('Team1');
      const secondMatchSideId1 = MatchSideId.from('Team2');
      const match1 = new Match({ matchId: matchId1, firstMatchSideId: firstMatchSideId1, secondMatchSideId: secondMatchSideId1 });

      const matchId2 = MatchId.from('matchId2');
      const firstMatchSideId2 = MatchSideId.from('Team3');
      const secondMatchSideId2 = MatchSideId.from('Team4');
      const match2 = new Match({ matchId: matchId2, firstMatchSideId: firstMatchSideId2, secondMatchSideId: secondMatchSideId2 });

      await repository.save(match1);
      await repository.save(match2);

      expect(await repository.findAll()).toStrictEqual([match1, match2]);
    });

    test('findByMatchId returns match with given id if was started', async () => {
      const matchId1 = MatchId.from('matchId1');
      const firstMatchSideId1 = MatchSideId.from('Team1');
      const secondMatchSideId1 = MatchSideId.from('Team2');
      const match1 = new Match({ matchId: matchId1, firstMatchSideId: firstMatchSideId1, secondMatchSideId: secondMatchSideId1 });

      const matchId2 = MatchId.from('matchId2');
      const firstMatchSideId2 = MatchSideId.from('Team3');
      const secondMatchSideId2 = MatchSideId.from('Team4');
      const match2 = new Match({ matchId: matchId2, firstMatchSideId: firstMatchSideId2, secondMatchSideId: secondMatchSideId2 });

      await repository.save(match1);
      await repository.save(match2);

      expect(await repository.findByMatchId(matchId1)).toStrictEqual(match1);
    });

    test('findByMatchId returns undefined when match with given id was not started', async () => {
      const matchId1 = MatchId.from('matchId1');
      const firstMatchSideId1 = MatchSideId.from('Team1');
      const secondMatchSideId1 = MatchSideId.from('Team2');
      const match1 = new Match({ matchId: matchId1, firstMatchSideId: firstMatchSideId1, secondMatchSideId: secondMatchSideId1 });

      await repository.save(match1);

      const notStartedMatchId = MatchId.from('NotStarted');
      expect(await repository.findByMatchId(notStartedMatchId)).toBeUndefined();
    });
  });
}
