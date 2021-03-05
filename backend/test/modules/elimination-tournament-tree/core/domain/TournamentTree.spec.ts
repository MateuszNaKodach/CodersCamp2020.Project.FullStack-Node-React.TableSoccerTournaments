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


    it('CreateTournamentTree | Create correct 4 teams empty tree', async () => {
        const teamEntityIdGen = NumberIdGeneratorStub(1000, "team");
        const matchEntityIdGen = NumberIdGeneratorStub(1000, "match");
        //Given
        const currentTime = new Date();
        const tournamentTeams = TournamentTeamsListGenerator(teamEntityIdGen, 4);

        // //When
        const winnerTree = createTournamentTree(
            {
                tournamentTeams: tournamentTeams,
                entityIdGenerator: matchEntityIdGen,
            });

        // Then
        const expectedWinnerTree: FightingTeamsGroup[] = [
            {
                "fightingTeamsGroupId": FightingTeamsGroupId.from("match_1"),
                "firstTeam": undefined,
                "secondTeam": undefined,
                "fightingTeamsGroupLevel": 1,
                "nextMatchId": undefined,
            },
            {
                "fightingTeamsGroupId": FightingTeamsGroupId.from("match_2"),
                "firstTeam": undefined,
                "secondTeam": undefined,
                "fightingTeamsGroupLevel": 0,
                "nextMatchId": FightingTeamsGroupId.from("match_1"),
            },
            {
                "fightingTeamsGroupId": FightingTeamsGroupId.from("match_3"),
                "firstTeam": undefined,
                "secondTeam": undefined,
                "fightingTeamsGroupLevel": 0,
                "nextMatchId": FightingTeamsGroupId.from("match_1"),

            },
        ].map((item) => FightingTeamsGroup.fromObj(item));

        expect(winnerTree).toIncludeSameMembers(expectedWinnerTree);

    });


    it('CreateTournamentTree | Create correct 4 teams tree', async () => {
        const teamEntityIdGen = NumberIdGeneratorStub(1000, "team");
        const matchEntityIdGen = NumberIdGeneratorStub(1000, "match");
        //Given
        const currentTime = new Date();
        const tournamentTeams = TournamentTeamsListGenerator(teamEntityIdGen, 4);
        // //When
        const winnerTree = createTournamentTree(
            {
                tournamentTeams: tournamentTeams,
                entityIdGenerator: matchEntityIdGen,
            });


        // //Then
        const propsForExpectedFightingTeamsGroups = [
            // ["match_1", tournamentTeam[0],  tournamentTeam[1], 0],
            [{"TYPE": "FightingTeamsGroup", "raw": "match_1"},
                undefined, undefined, 1, undefined],
            [{
                "TYPE": "FightingTeamsGroup",
                "raw": "match_2"
            }, tournamentTeams[0], tournamentTeams[3], 0, {"TYPE": "FightingTeamsGroup", "raw": "match_3"}],
            [{
                "TYPE": "FightingTeamsGroup",
                "raw": "match_3"
            }, tournamentTeams[1], tournamentTeams[2], 0, {"TYPE": "FightingTeamsGroup", "raw": "match_3"}],
        ];
        const expectedWinnerTree = [
            FightingTeamsGroup.fromArray(propsForExpectedFightingTeamsGroups[0]),
            FightingTeamsGroup.fromArray(propsForExpectedFightingTeamsGroups[1]),
            FightingTeamsGroup.fromArray(propsForExpectedFightingTeamsGroups[2])
        ];
        expect(winnerTree).toIncludeSameMembers(expectedWinnerTree);
    });


});
