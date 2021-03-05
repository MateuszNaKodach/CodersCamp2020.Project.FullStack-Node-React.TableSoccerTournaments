// import { testDoublesTournamentsModule } from './TestDoublesTournamentsModule';
import {FromListIdGeneratorStub} from '../../../../test-support/shared/core/FromListIdGeneratorStub';
import {FindAllDoublesTournaments} from '../../../../../src/modules/doubles-tournament/core/application/query/FindAllDoublesTournaments';
import {CreateTournamentWithTeams} from '../../../../../src/modules/doubles-tournament/core/application/command/CreateTournamentWithTeams';
import {DoublesTournament} from '../../../../../src/modules/doubles-tournament/core/domain/DoublesTournament';
import {TournamentTeam} from '../../../../../src/modules/doubles-tournament/core/domain/TournamentTeam';
import {FindDoublesTournamentById} from '../../../../../src/modules/doubles-tournament/core/application/query/FindDoublesTournamentById';
import {TeamId} from '../../../../../src/modules/doubles-tournament/core/domain/TeamId';
import {NumberIdGeneratorStub} from "../../../../test-support/shared/core/NumberIdGeneratorStub";
import {EntityIdGenerator} from "../../../../../src/shared/core/application/EntityIdGenerator";
import {
    createTournamentTree
} from "../../../../../src/modules/elimination-tournament-tree/core/domain/TournamentTree";
import {TournamentTeamsListGenerator} from "./TouramentTeamsListGenerator";
import {FightingTeamsGroup} from "../../../../../src/modules/elimination-tournament-tree/core/domain/FightingTeamsGroup";
import {FightingTeamsGroupId} from "../../../../../src/modules/elimination-tournament-tree/core/domain/FightingTeamsGroupId";
import {TournamentTeamId} from "../../../../../src/modules/elimination-tournament-tree/core/domain/TournamentTeamId";

describe('TournamentTree', () => {

    const teamEntityIdGen = NumberIdGeneratorStub(1000, "team");
    const matchEntityIdGen = NumberIdGeneratorStub(1000, "match");

    it('CreateTournamentTree | Create correct 4 teams empty tree', async () => {
        //Given
        const currentTime = new Date();
        const tournamentTeams = TournamentTeamsListGenerator(teamEntityIdGen, 4);

        // //When
        const winnerTree = createTournamentTree(
            {
                tournamentTeams:  tournamentTeams,
                entityIdGenerator: matchEntityIdGen,
            });

        // //Then
        const propsForExpectedFightingTeamsGroups = [
            // ["match_1", tournamentTeam[0],  tournamentTeam[1], 0],
            ["match_1",tournamentTeams[0] , tournamentTeams[3], 0, "match_3"],
            ["match_2", tournamentTeams[1], tournamentTeams[2], 0, "match_3"],
            ["match_3", undefined, undefined],
        ];
        const expectedWinnerTree = [
            FightingTeamsGroup.fromArray(propsForExpectedFightingTeamsGroups[0]),
            FightingTeamsGroup.fromArray(propsForExpectedFightingTeamsGroups[1]),
            FightingTeamsGroup.fromArray(propsForExpectedFightingTeamsGroups[2])
        ];
        expect(winnerTree).toIncludeSameMembers(expectedWinnerTree);
    });
    //
    // it('CreateEmptyTournamentTree | Create correct 4 teams empty tree', async () => {
    //     //Given
    //     const currentTime = new Date();
    //     const tournamentTeam = TournamentTeamsListGenerator(teamEntityIdGen, 4);
    //     const expectedWinnerTree  = Array.from(Array(7))    .map(item => emptyFightingTeamsGroup);
    //
    //
    //     // //When
    //     createEmptyTournamentTree();
    //     // const findAllDoublesTournamentsResult = await doublesTournaments.executeQuery<FindAllDoublesTournaments>(
    //     //     new FindAllDoublesTournaments(),
    //     // );
    //     //
    //     // //Then
    //     const expectedWinnerTree  = Array.from(Array(7))    .map(item => emptyFightingTeamsGroup);
    //     const expectedLoserTree = Array.from(Array(3))    .map(item => emptyFightingTeamsGroup);
    //     const expectedFinalTree = Array.from(Array(3))    .map(item => emptyFightingTeamsGroup);
    //     expect(true).toBeEmpty();
    //     // expect(findAllDoublesTournamentsResult).toBeEmpty();
    // });

});
