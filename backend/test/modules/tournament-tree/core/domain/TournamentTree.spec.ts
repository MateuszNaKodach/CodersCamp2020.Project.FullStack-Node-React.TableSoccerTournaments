import { NumberIdGeneratorStub } from '../../../../test-support/shared/core/NumberIdGeneratorStub';
import { createTournamentTree, TournamentTree } from '../../../../../src/modules/tournament-tree/core/domain/TournamentTree';
import { generateTournamentTeamsList } from './TouramentTeamsListGenerator';
import { FightingTeamsGroup } from '../../../../../src/modules/tournament-tree/core/domain/FightingTeamsGroup';
import { FightingTeamsGroupId } from '../../../../../src/modules/tournament-tree/core/domain/FightingTeamsGroupId';
import { TournamentTeam } from '../../../../../src/modules/tournament-tree/core/domain/TournamentTeam';
import { CurrentTimeProvider } from '../../../../../src/shared/core/CurrentTimeProvider';
import { EntityIdGenerator } from '../../../../../src/shared/core/application/EntityIdGenerator';
import { state } from '@stryker-mutator/jest-runner/src/messaging';

describe('TournamentTree', () => {
  describe('Single Tournament Tree', () => {
    const testTournamentId = NumberIdGeneratorStub(1000, 'testTournamentId');

    it('CreateTournamentTree | Create correct 4 teams tree', async () => {
      //Given
      const teamEntityIdGen = NumberIdGeneratorStub(1000, 'team');
      const matchEntityIdGen = NumberIdGeneratorStub(1000, 'match');
      const tournamentTeamsList = generateTournamentTeamsList(teamEntityIdGen, 4);

      // //When
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
        },
        {
          fightingTeamsGroupId: FightingTeamsGroupId.from('match_2'),
          firstTeam: tournamentTeamsList[2],
          secondTeam: tournamentTeamsList[1],
          fightingTeamsGroupLevel: 0,
          nextMatchId: FightingTeamsGroupId.from('match_1'),
          matchNumberInSequence: 2,
        },
        {
          fightingTeamsGroupId: FightingTeamsGroupId.from('match_1'),
          firstTeam: undefined,
          secondTeam: undefined,
          fightingTeamsGroupLevel: 1,
          nextMatchId: undefined,
          matchNumberInSequence: 3,
        },
      ].map((item) => FightingTeamsGroup.fromObj(item));

      // Then
      expect(tournamentTree.getTournamentTreeArray()).toIncludeSameMembers(expectedWinnerTree);
    });

    it('CreateTournamentTree | Create correct 6 teams tree', async () => {
      //Given
      const teamEntityIdGen = NumberIdGeneratorStub(1000, 'team');
      const matchEntityIdGen = NumberIdGeneratorStub(1000, 'match');
      const tournamentTeamsList = generateTournamentTeamsList(teamEntityIdGen, 6);

      // //When
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
        },
        {
          fightingTeamsGroupId: FightingTeamsGroupId.from('match_6'),
          firstTeam: tournamentTeamsList[4],
          secondTeam: tournamentTeamsList[3],
          fightingTeamsGroupLevel: 0,
          nextMatchId: FightingTeamsGroupId.from('match_3'),
          matchNumberInSequence: 2,
        },
        {
          fightingTeamsGroupId: FightingTeamsGroupId.from('match_5'),
          firstTeam: tournamentTeamsList[2],
          secondTeam: tournamentTeamsList[5],
          fightingTeamsGroupLevel: 0,
          nextMatchId: FightingTeamsGroupId.from('match_2'),
          matchNumberInSequence: 3,
        },
        {
          fightingTeamsGroupId: FightingTeamsGroupId.from('match_4'),
          firstTeam: undefined,
          secondTeam: tournamentTeamsList[1],
          fightingTeamsGroupLevel: 0,
          nextMatchId: FightingTeamsGroupId.from('match_2'),
          matchNumberInSequence: 4,
        },
        {
          fightingTeamsGroupId: FightingTeamsGroupId.from('match_3'),
          firstTeam: undefined,
          secondTeam: undefined,
          fightingTeamsGroupLevel: 1,
          nextMatchId: FightingTeamsGroupId.from('match_1'),
          matchNumberInSequence: 5,
        },
        {
          fightingTeamsGroupId: FightingTeamsGroupId.from('match_2'),
          firstTeam: undefined,
          secondTeam: undefined,
          fightingTeamsGroupLevel: 1,
          nextMatchId: FightingTeamsGroupId.from('match_1'),
          matchNumberInSequence: 6,
        },
        {
          fightingTeamsGroupId: FightingTeamsGroupId.from('match_1'),
          firstTeam: undefined,
          secondTeam: undefined,
          fightingTeamsGroupLevel: 2,
          nextMatchId: undefined,
          matchNumberInSequence: 7,
        },
      ].map((item) => FightingTeamsGroup.fromObj(item));

      // Then
      expect(tournamentTree.getTournamentTreeArray()).toIncludeSameMembers(expectedWinnerTree);
    });
  });

  describe('getMatchQueue() function', () => {
    const testTournamentId = NumberIdGeneratorStub(1000, 'testTournamentId');

    it('Get queue from 4 teams tree', async () => {
      //Given
      const teamEntityIdGen = NumberIdGeneratorStub(1000, 'team');
      const matchEntityIdGen = NumberIdGeneratorStub(1000, 'match');
      const tournamentTeamsList = generateTournamentTeamsList(teamEntityIdGen, 4);

      // //When
      const tournamentTree: TournamentTree = TournamentTree.createSingleTournamentTree({
        tournamentId: testTournamentId.generate(),
        tournamentTeams: tournamentTeamsList,
        entityIdGenerator: matchEntityIdGen,
      });

      const expectedMatchesQueue: FightingTeamsGroup[] = [
        {
          fightingTeamsGroupId: FightingTeamsGroupId.from('match_3'),
          firstTeam: tournamentTeamsList[0],
          secondTeam: tournamentTeamsList[3],
          fightingTeamsGroupLevel: 0,
          nextMatchId: FightingTeamsGroupId.from('match_1'),
          matchNumberInSequence: 1,
        },
        {
          fightingTeamsGroupId: FightingTeamsGroupId.from('match_2'),
          firstTeam: tournamentTeamsList[2],
          secondTeam: tournamentTeamsList[1],
          fightingTeamsGroupLevel: 0,
          nextMatchId: FightingTeamsGroupId.from('match_1'),
          matchNumberInSequence: 2,
        },
      ].map((item) => FightingTeamsGroup.fromObj(item));

      // Then
      expect(tournamentTree.getMatchesQueueReadyToBegin()).toIncludeSameMembers(expectedMatchesQueue);
    });

    it('Get queue from 6 teams tree', async () => {
      //Given
      const teamEntityIdGen = NumberIdGeneratorStub(1000, 'team');
      const matchEntityIdGen = NumberIdGeneratorStub(1000, 'match');
      const tournamentTeamsList = generateTournamentTeamsList(teamEntityIdGen, 6);

      // //When
      const tournamentTree: TournamentTree = TournamentTree.createSingleTournamentTree({
        tournamentId: testTournamentId.generate(),
        tournamentTeams: tournamentTeamsList,
        entityIdGenerator: matchEntityIdGen,
      });

      const expectedMatchesQueue: FightingTeamsGroup[] = [
        {
          fightingTeamsGroupId: FightingTeamsGroupId.from('match_6'),
          firstTeam: tournamentTeamsList[4],
          secondTeam: tournamentTeamsList[3],
          fightingTeamsGroupLevel: 0,
          nextMatchId: FightingTeamsGroupId.from('match_3'),
          matchNumberInSequence: 2,
        },
        {
          fightingTeamsGroupId: FightingTeamsGroupId.from('match_5'),
          firstTeam: tournamentTeamsList[2],
          secondTeam: tournamentTeamsList[5],
          fightingTeamsGroupLevel: 0,
          nextMatchId: FightingTeamsGroupId.from('match_2'),
          matchNumberInSequence: 3,
        },
      ].map((item) => FightingTeamsGroup.fromObj(item));

      // Then
      expect(tournamentTree.getMatchesQueueReadyToBegin()).toIncludeSameMembers(expectedMatchesQueue);
    });
  });

  describe('getMatchIdFromMatchNumberInSequence() function', () => {
    const testTournamentId = NumberIdGeneratorStub(1000, 'testTournamentId');

    it('Find match Id', async () => {
      //Given
      const teamEntityIdGen = NumberIdGeneratorStub(1000, 'team');
      const matchEntityIdGen = NumberIdGeneratorStub(1000, 'match');
      const tournamentTeamsList = generateTournamentTeamsList(teamEntityIdGen, 6);

      // //When
      const tournamentTree: TournamentTree = TournamentTree.createSingleTournamentTree({
        tournamentId: testTournamentId.generate(),
        tournamentTeams: tournamentTeamsList,
        entityIdGenerator: matchEntityIdGen,
      });

      expect(tournamentTree.getMatchIdFromMatchNumberInSequence(2)).toBe('match_6');
      expect(tournamentTree.getMatchIdFromMatchNumberInSequence(5)).toBe('match_3');
    });

    it('Try find not existed match and return undefined', async () => {
      //Given
      const teamEntityIdGen = NumberIdGeneratorStub(1000, 'team');
      const matchEntityIdGen = NumberIdGeneratorStub(1000, 'match');
      const tournamentTeamsList = generateTournamentTeamsList(teamEntityIdGen, 6);

      // //When
      const tournamentTree: TournamentTree = TournamentTree.createSingleTournamentTree({
        tournamentId: testTournamentId.generate(),
        tournamentTeams: tournamentTeamsList,
        entityIdGenerator: matchEntityIdGen,
      });

      expect(tournamentTree.getMatchIdFromMatchNumberInSequence(100)).toBeUndefined();
    });
  });

  describe('setMatchWinner() function', () => {
    const testTournamentId = NumberIdGeneratorStub(1000, 'testTournamentId');

    it('Set match winner | 4 teams tree and one match is finished', async () => {
      //Given
      const teamEntityIdGen = NumberIdGeneratorStub(1000, 'team');
      const matchEntityIdGen = NumberIdGeneratorStub(1000, 'match');
      const tournamentTeamsList = generateTournamentTeamsList(teamEntityIdGen, 4);

      // //When
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
        },
        {
          fightingTeamsGroupId: FightingTeamsGroupId.from('match_2'),
          firstTeam: tournamentTeamsList[2],
          secondTeam: tournamentTeamsList[1],
          fightingTeamsGroupLevel: 0,
          nextMatchId: FightingTeamsGroupId.from('match_1'),
          matchNumberInSequence: 2,
        },
        {
          fightingTeamsGroupId: FightingTeamsGroupId.from('match_1'),
          firstTeam: tournamentTeamsList[0],
          secondTeam: undefined,
          fightingTeamsGroupLevel: 1,
          nextMatchId: undefined,
          matchNumberInSequence: 3,
        },
      ].map((item) => FightingTeamsGroup.fromObj(item));

      // Then
      expect(  tournamentTree.setMatchWinner('match_3', tournamentTeamsList[0].teamId.raw)).toBe(true);
      expect(tournamentTree.getTournamentTreeArray()).toIncludeSameMembers(expectedWinnerTree);
      expect(  tournamentTree.setMatchWinner('NotExistedId', tournamentTeamsList[0].teamId.raw)).toBe(false);
      expect(  tournamentTree.setMatchWinner('match_3', 'NotExistedId')).toBe(false);
    });
  });

  describe('Other functions', () => {
    const testIdGenerator = NumberIdGeneratorStub(1000, 'testId');

    it('getTournamentTreeIdArray() | Correct called', async () => {
      //Given
      const teamEntityIdGen = NumberIdGeneratorStub(1000, 'team');
      const tournamentTeamsList = generateTournamentTeamsList(teamEntityIdGen, 4);

      // Then
      const result = createTournamentTree(
        undefined,
        { tournamentId: 'testTournamentId', tournamentTeams: tournamentTeamsList },
        () => new Date(),
        testIdGenerator,
      );
      expect(result.events).toBeArray();
    });

    it('getTournamentTreeIdArray', async () => {
      //Given
      const teamEntityIdGen = NumberIdGeneratorStub(1000, 'team');
      const matchEntityIdGen = NumberIdGeneratorStub(1000, 'match');
      const tournamentTeamsList = generateTournamentTeamsList(teamEntityIdGen, 4);

      // //When
      const tournamentTree: TournamentTree = TournamentTree.createSingleTournamentTree({
        tournamentId: testIdGenerator.generate(),
        tournamentTeams: tournamentTeamsList,
        entityIdGenerator: matchEntityIdGen,
      });

      // Then
      expect(tournamentTree.getTournamentTreeIdArray()).toBeArray();
      expect(tournamentTree.getTournamentTreeIdArray()[0]).toBe("match_3");
    });

    it('getMatchesQueueIdArray', async () => {
      //Given
      const teamEntityIdGen = NumberIdGeneratorStub(1000, 'team');
      const matchEntityIdGen = NumberIdGeneratorStub(1000, 'match');
      const tournamentTeamsList = generateTournamentTeamsList(teamEntityIdGen, 4);

      // //When
      const tournamentTree: TournamentTree = TournamentTree.createSingleTournamentTree({
        tournamentId: testIdGenerator.generate(),
        tournamentTeams: tournamentTeamsList,
        entityIdGenerator: matchEntityIdGen,
      });

      // Then
      expect(tournamentTree.getMatchesQueueIdArray()).toBeArray();
      expect(tournamentTree.getMatchesQueueIdArray().length).toBe(2);
    });
  });

});
