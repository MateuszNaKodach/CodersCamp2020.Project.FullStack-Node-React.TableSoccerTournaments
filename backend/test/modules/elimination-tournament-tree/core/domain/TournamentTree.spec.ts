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
import {   TournamentTree} from "../../../../../src/modules/elimination-tournament-tree/core/domain/TournamentTree";
import {generateTournamentTeamsList} from "./TouramentTeamsListGenerator";
import {FightingTeamsGroup} from "../../../../../src/modules/elimination-tournament-tree/core/domain/FightingTeamsGroup";
import {FightingTeamsGroupId} from "../../../../../src/modules/elimination-tournament-tree/core/domain/FightingTeamsGroupId";
import {TournamentTeamId} from "../../../../../src/modules/elimination-tournament-tree/core/domain/TournamentTeamId";

describe('TournamentTree', () => {

    it('CreateTournamentTree | Create correct 4 teams tree', async () => {
        //Given
        const teamEntityIdGen = NumberIdGeneratorStub(1000, "team");
        const matchEntityIdGen = NumberIdGeneratorStub(1000, "match");
        const tournamentTeamsList = generateTournamentTeamsList(teamEntityIdGen, 4);

        // //When
        const tournamentTree : TournamentTree = TournamentTree.createSingleTournamentTree(
            {
                tournamentTeams: tournamentTeamsList,
                entityIdGenerator: matchEntityIdGen,
            });

        // Then
        const expectedWinnerTree: FightingTeamsGroup[] = [
            {
                "fightingTeamsGroupId": FightingTeamsGroupId.from("match_3"),
                "firstTeam": tournamentTeamsList[0],
                "secondTeam": tournamentTeamsList[3],
                "fightingTeamsGroupLevel": 0,
                "nextMatchId": FightingTeamsGroupId.from("match_1"),
            },{
                "fightingTeamsGroupId": FightingTeamsGroupId.from("match_2"),
                "firstTeam": tournamentTeamsList[2],
                "secondTeam": tournamentTeamsList[1],
                "fightingTeamsGroupLevel": 0,
                "nextMatchId": FightingTeamsGroupId.from("match_1"),
            }, {
                "fightingTeamsGroupId": FightingTeamsGroupId.from("match_1"),
                "firstTeam": undefined,
                "secondTeam": undefined,
                "fightingTeamsGroupLevel": 1,
                "nextMatchId": undefined,
            },
        ].map((item) => FightingTeamsGroup.fromObj(item));

        expect(tournamentTree.getTournamentTreeArray()).toIncludeSameMembers(expectedWinnerTree);
    });


    it('CreateTournamentTree | Create correct 6 teams tree', async () => {
        //Given
        const teamEntityIdGen = NumberIdGeneratorStub(1000, "team");
        const matchEntityIdGen = NumberIdGeneratorStub(1000, "match");
        const tournamentTeamsList = generateTournamentTeamsList(teamEntityIdGen, 6);

        // //When
        const tournamentTree : TournamentTree = TournamentTree.createSingleTournamentTree(
            {
                tournamentTeams: tournamentTeamsList,
                entityIdGenerator: matchEntityIdGen,
            });

        // Then
        const expectedWinnerTree: FightingTeamsGroup[] = [
            {
                "fightingTeamsGroupId": FightingTeamsGroupId.from("match_7"),
                "firstTeam": tournamentTeamsList[0],
                "secondTeam": undefined,
                "fightingTeamsGroupLevel": 0,
                "nextMatchId": FightingTeamsGroupId.from("match_3"),
            },{
                "fightingTeamsGroupId": FightingTeamsGroupId.from("match_6"),
                "firstTeam": tournamentTeamsList[4],
                "secondTeam": tournamentTeamsList[3],
                "fightingTeamsGroupLevel": 0,
                "nextMatchId": FightingTeamsGroupId.from("match_3"),
            },{
                "fightingTeamsGroupId": FightingTeamsGroupId.from("match_5"),
                "firstTeam": tournamentTeamsList[2],
                "secondTeam": tournamentTeamsList[5],
                "fightingTeamsGroupLevel": 0,
                "nextMatchId": FightingTeamsGroupId.from("match_2"),
            },{
                "fightingTeamsGroupId": FightingTeamsGroupId.from("match_4"),
                "firstTeam": undefined ,
                "secondTeam": tournamentTeamsList[1],
                "fightingTeamsGroupLevel": 0,
                "nextMatchId":FightingTeamsGroupId.from("match_2"),
            },{
                "fightingTeamsGroupId": FightingTeamsGroupId.from("match_3"),
                "firstTeam": undefined,
                "secondTeam": undefined,
                "fightingTeamsGroupLevel": 1,
                "nextMatchId": FightingTeamsGroupId.from("match_1"),
            },{
                "fightingTeamsGroupId": FightingTeamsGroupId.from("match_2"),
                "firstTeam": undefined,
                "secondTeam": undefined,
                "fightingTeamsGroupLevel": 1,
                "nextMatchId": FightingTeamsGroupId.from("match_1"),
            },{
                "fightingTeamsGroupId": FightingTeamsGroupId.from("match_1"),
                "firstTeam": undefined,
                "secondTeam": undefined,
                "fightingTeamsGroupLevel": 2,
                "nextMatchId": undefined,
            },
        ].map((item) => FightingTeamsGroup.fromObj(item));

        expect(tournamentTree.getTournamentTreeArray()).toIncludeSameMembers(expectedWinnerTree);
    });
});
