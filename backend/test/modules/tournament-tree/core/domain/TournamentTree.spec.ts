import { NumberIdGeneratorStub } from '../../../../test-support/shared/core/NumberIdGeneratorStub';
import { createTournamentTree, TournamentTree } from '../../../../../src/modules/tournament-tree/core/domain/TournamentTree';
import { generateTournamentTeamsList } from './TouramentTeamsListGenerator';
import { FightingTeamsGroup } from '../../../../../src/modules/tournament-tree/core/domain/FightingTeamsGroup';
import { FightingTeamsGroupId } from '../../../../../src/modules/tournament-tree/core/domain/FightingTeamsGroupId';
import { MatchReadyToStart } from '../../../../../src/modules/tournament-tree/core/domain/MatchReadyToStart';

describe('TournamentTree', () => {
  describe('Single Tournament Tree', () => {
    const testTournamentId = NumberIdGeneratorStub(1000, 'testTournamentId');

    it('CreateTournamentTree | Create correct 4 teams tree', async () => {
      const teamEntityIdGen = NumberIdGeneratorStub(1000, 'team');
      const matchEntityIdGen = NumberIdGeneratorStub(1000, 'match');
      const tournamentTeamsList = generateTournamentTeamsList(teamEntityIdGen, 4);

      const tournamentTree: TournamentTree = TournamentTree.createSingleTournamentTree({
        tournamentId: testTournamentId.generate(),
        tournamentTeams: tournamentTeamsList,
        entityIdGenerator: matchEntityIdGen,
      });
      const expectedWinnerTree: FightingTeamsGroup[] = [
        {
          fightingTeamsGroupId: FightingTeamsGroupId.from('match_3'),
          firstTeam: tournamentTeamsList[0],
          secondTeam: tournamentTeamsList[3],
          fightingTeamsGroupLevel: 0,
          nextMatchId: FightingTeamsGroupId.from('match_1'),
          matchNumberInSequence: 1,
          isMatchFinished: false,
        },
        {
          fightingTeamsGroupId: FightingTeamsGroupId.from('match_2'),
          firstTeam: tournamentTeamsList[2],
          secondTeam: tournamentTeamsList[1],
          fightingTeamsGroupLevel: 0,
          nextMatchId: FightingTeamsGroupId.from('match_1'),
          matchNumberInSequence: 2,
          isMatchFinished: false,
        },
        {
          fightingTeamsGroupId: FightingTeamsGroupId.from('match_1'),
          firstTeam: undefined,
          secondTeam: undefined,
          fightingTeamsGroupLevel: 1,
          nextMatchId: undefined,
          matchNumberInSequence: 3,
          isMatchFinished: false,
        },
      ].map((item) => FightingTeamsGroup.fromObj(item));

      expect(tournamentTree.getTournamentTreeArray()).toIncludeSameMembers(expectedWinnerTree);
    });

    it('CreateTournamentTree | Create correct 6 teams tree', async () => {
      const teamEntityIdGen = NumberIdGeneratorStub(1000, 'team');
      const matchEntityIdGen = NumberIdGeneratorStub(1000, 'match');
      const tournamentTeamsList = generateTournamentTeamsList(teamEntityIdGen, 6);

      const tournamentTree: TournamentTree = TournamentTree.createSingleTournamentTree({
        tournamentId: testTournamentId.generate(),
        tournamentTeams: tournamentTeamsList,
        entityIdGenerator: matchEntityIdGen,
      });

      const expectedWinnerTree: FightingTeamsGroup[] = [
        {
          fightingTeamsGroupId: FightingTeamsGroupId.from('match_7'),
          firstTeam: tournamentTeamsList[0],
          secondTeam: undefined,
          fightingTeamsGroupLevel: 0,
          nextMatchId: FightingTeamsGroupId.from('match_3'),
          matchNumberInSequence: 1,
          isMatchFinished: true,
        },
        {
          fightingTeamsGroupId: FightingTeamsGroupId.from('match_6'),
          firstTeam: tournamentTeamsList[4],
          secondTeam: tournamentTeamsList[3],
          fightingTeamsGroupLevel: 0,
          nextMatchId: FightingTeamsGroupId.from('match_3'),
          matchNumberInSequence: 2,
          isMatchFinished: false,
        },
        {
          fightingTeamsGroupId: FightingTeamsGroupId.from('match_5'),
          firstTeam: tournamentTeamsList[2],
          secondTeam: tournamentTeamsList[5],
          fightingTeamsGroupLevel: 0,
          nextMatchId: FightingTeamsGroupId.from('match_2'),
          matchNumberInSequence: 3,
          isMatchFinished: false,
        },
        {
          fightingTeamsGroupId: FightingTeamsGroupId.from('match_4'),
          firstTeam: undefined,
          secondTeam: tournamentTeamsList[1],
          fightingTeamsGroupLevel: 0,
          nextMatchId: FightingTeamsGroupId.from('match_2'),
          matchNumberInSequence: 4,
          isMatchFinished: true,
        },
        {
          fightingTeamsGroupId: FightingTeamsGroupId.from('match_3'),
          firstTeam: tournamentTeamsList[0],
          secondTeam: undefined,
          fightingTeamsGroupLevel: 1,
          nextMatchId: FightingTeamsGroupId.from('match_1'),
          matchNumberInSequence: 5,
          isMatchFinished: false,
        },
        {
          fightingTeamsGroupId: FightingTeamsGroupId.from('match_2'),
          firstTeam: tournamentTeamsList[1],
          secondTeam: undefined,
          fightingTeamsGroupLevel: 1,
          nextMatchId: FightingTeamsGroupId.from('match_1'),
          matchNumberInSequence: 6,
          isMatchFinished: false,
        },
        {
          fightingTeamsGroupId: FightingTeamsGroupId.from('match_1'),
          firstTeam: undefined,
          secondTeam: undefined,
          fightingTeamsGroupLevel: 2,
          nextMatchId: undefined,
          matchNumberInSequence: 7,
          isMatchFinished: false,
        },
      ].map((item) => FightingTeamsGroup.fromObj(item));
      expect(tournamentTree.getTournamentTreeArray()).toIncludeSameMembers(expectedWinnerTree);
    });
  });

  describe('Generate matches queue', () => {
    const testTournamentId = NumberIdGeneratorStub(1000, 'testTournamentId');

    it('from 4 teams tree', async () => {
      const teamEntityIdGen = NumberIdGeneratorStub(1000, 'team');
      const matchEntityIdGen = NumberIdGeneratorStub(1000, 'match');
      const tournamentTeamsList = generateTournamentTeamsList(teamEntityIdGen, 4);

      const tournamentTree: TournamentTree = TournamentTree.createSingleTournamentTree({
        tournamentId: testTournamentId.generate(),
        tournamentTeams: tournamentTeamsList,
        entityIdGenerator: matchEntityIdGen,
      });

      const expectedMatchesQueue: MatchReadyToStart[] = [
        {
          firstTeam: tournamentTeamsList[0],
          secondTeam: tournamentTeamsList[3],
          matchNumber: 1,
        },
        {
          firstTeam: tournamentTeamsList[2],
          secondTeam: tournamentTeamsList[1],
          matchNumber: 2,
        },
      ];

      expect(tournamentTree.getMatchesQueueReadyToStart()).toIncludeSameMembers(expectedMatchesQueue);
    });

    it('from 6 teams tree', async () => {
      const teamEntityIdGen = NumberIdGeneratorStub(1000, 'team');
      const matchEntityIdGen = NumberIdGeneratorStub(1000, 'match');
      const tournamentTeamsList = generateTournamentTeamsList(teamEntityIdGen, 6);

      const tournamentTree: TournamentTree = TournamentTree.createSingleTournamentTree({
        tournamentId: testTournamentId.generate(),
        tournamentTeams: tournamentTeamsList,
        entityIdGenerator: matchEntityIdGen,
      });
      const expectedMatchesQueue: MatchReadyToStart[] = [
        {
          firstTeam: tournamentTeamsList[4],
          secondTeam: tournamentTeamsList[3],
          matchNumber: 2,
        },
        {
          firstTeam: tournamentTeamsList[2],
          secondTeam: tournamentTeamsList[5],
          matchNumber: 3,
        },
      ];

      expect(tournamentTree.getMatchesQueueReadyToStart()).toIncludeSameMembers(expectedMatchesQueue);
    });
  });

  describe('get match id from match number in sequence', () => {
    const testTournamentId = NumberIdGeneratorStub(1000, 'testTournamentId');

    it('when given correct id', async () => {
      const teamEntityIdGen = NumberIdGeneratorStub(1000, 'team');
      const matchEntityIdGen = NumberIdGeneratorStub(1000, 'match');
      const tournamentTeamsList = generateTournamentTeamsList(teamEntityIdGen, 6);

      const tournamentTree: TournamentTree = TournamentTree.createSingleTournamentTree({
        tournamentId: testTournamentId.generate(),
        tournamentTeams: tournamentTeamsList,
        entityIdGenerator: matchEntityIdGen,
      });

      expect(tournamentTree.getMatchIdFromMatchNumberInSequence(2)).toBe('match_6');
      expect(tournamentTree.getMatchIdFromMatchNumberInSequence(5)).toBe('match_3');
    });

    it('Try find not existed match and return undefined', async () => {
      const teamEntityIdGen = NumberIdGeneratorStub(1000, 'team');
      const matchEntityIdGen = NumberIdGeneratorStub(1000, 'match');
      const tournamentTeamsList = generateTournamentTeamsList(teamEntityIdGen, 6);

      const tournamentTree: TournamentTree = TournamentTree.createSingleTournamentTree({
        tournamentId: testTournamentId.generate(),
        tournamentTeams: tournamentTeamsList,
        entityIdGenerator: matchEntityIdGen,
      });

      expect(tournamentTree.getMatchIdFromMatchNumberInSequence(100)).toBeUndefined();
    });
  });

  describe('save match result', () => {
    const testTournamentId = NumberIdGeneratorStub(1000, 'testTournamentId');

    it('when is 4 teams tree and two matches is finished ', async () => {
      const teamEntityIdGen = NumberIdGeneratorStub(1000, 'team');
      const matchEntityIdGen = NumberIdGeneratorStub(1000, 'match');
      const tournamentTeamsList = generateTournamentTeamsList(teamEntityIdGen, 4);

      const tournamentTree: TournamentTree = TournamentTree.createSingleTournamentTree({
        tournamentId: testTournamentId.generate(),
        tournamentTeams: tournamentTeamsList,
        entityIdGenerator: matchEntityIdGen,
      });

      const expectedWinnerTree: FightingTeamsGroup[] = [
        {
          fightingTeamsGroupId: FightingTeamsGroupId.from('match_3'),
          firstTeam: tournamentTeamsList[0],
          secondTeam: tournamentTeamsList[3],
          fightingTeamsGroupLevel: 0,
          nextMatchId: FightingTeamsGroupId.from('match_1'),
          matchNumberInSequence: 1,
          isMatchFinished: true,
        },
        {
          fightingTeamsGroupId: FightingTeamsGroupId.from('match_2'),
          firstTeam: tournamentTeamsList[2],
          secondTeam: tournamentTeamsList[1],
          fightingTeamsGroupLevel: 0,
          nextMatchId: FightingTeamsGroupId.from('match_1'),
          matchNumberInSequence: 2,
          isMatchFinished: true,
        },
        {
          fightingTeamsGroupId: FightingTeamsGroupId.from('match_1'),
          firstTeam: tournamentTeamsList[0],
          secondTeam: tournamentTeamsList[1],
          fightingTeamsGroupLevel: 1,
          nextMatchId: undefined,
          matchNumberInSequence: 3,
          isMatchFinished: false,
        },
      ].map((item) => FightingTeamsGroup.fromObj(item));

      tournamentTree.finishMatchInTreeAndGetNextOne(1, tournamentTeamsList[0].teamId.raw);
      tournamentTree.finishMatchInTreeAndGetNextOne(2, tournamentTeamsList[1].teamId.raw);
      expect(tournamentTree.getTournamentTreeArray()).toIncludeSameMembers(expectedWinnerTree);
    });
  });

  describe('Other functions', () => {
    const testIdGenerator = NumberIdGeneratorStub(1000, 'testId');

    it('createTournamentTree | Correct called', async () => {
      const teamEntityIdGen = NumberIdGeneratorStub(1000, 'team');
      const tournamentTeamsList = generateTournamentTeamsList(teamEntityIdGen, 4);

      const result = createTournamentTree(
        undefined,
        { tournamentId: 'testTournamentId', tournamentTeams: tournamentTeamsList },
        () => new Date(),
        testIdGenerator,
      );
      expect(result.events).toBeArray();
    });

    it('getTournamentTreeIdArray', async () => {
      const teamEntityIdGen = NumberIdGeneratorStub(1000, 'team');
      const matchEntityIdGen = NumberIdGeneratorStub(1000, 'match');
      const tournamentTeamsList = generateTournamentTeamsList(teamEntityIdGen, 4);

      const tournamentTree: TournamentTree = TournamentTree.createSingleTournamentTree({
        tournamentId: testIdGenerator.generate(),
        tournamentTeams: tournamentTeamsList,
        entityIdGenerator: matchEntityIdGen,
      });

      expect(tournamentTree.getTournamentTreeIdArray()).toBeArray();
      expect(tournamentTree.getTournamentTreeIdArray()[0]).toBe('match_3');
    });

    it('getMatchesQueueIdArray', async () => {
      const teamEntityIdGen = NumberIdGeneratorStub(1000, 'team');
      const matchEntityIdGen = NumberIdGeneratorStub(1000, 'match');
      const tournamentTeamsList = generateTournamentTeamsList(teamEntityIdGen, 4);

      const tournamentTree: TournamentTree = TournamentTree.createSingleTournamentTree({
        tournamentId: testIdGenerator.generate(),
        tournamentTeams: tournamentTeamsList,
        entityIdGenerator: matchEntityIdGen,
      });

      expect(tournamentTree.getMatchesQueueIdArray()).toBeArray();
      expect(tournamentTree.getMatchesQueueIdArray().length).toBe(2);
    });
  });
});
