import { NumberIdGeneratorStub } from '../../../../test-support/shared/core/NumberIdGeneratorStub';
import { TournamentTree } from '../../../../../src/modules/tournament-tree/core/domain/TournamentTree';
import { generateTournamentTeamsList } from './TouramentTeamsListGenerator';
import { FightingTeamsGroup } from '../../../../../src/modules/tournament-tree/core/domain/FightingTeamsGroup';
import { FightingTeamsGroupId } from '../../../../../src/modules/tournament-tree/core/domain/FightingTeamsGroupId';

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

  describe('getMatchIdFromMatch() function', () => {
    it('Find mat', async () => {
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
