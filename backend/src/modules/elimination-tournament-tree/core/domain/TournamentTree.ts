import {TournamentTeam} from "./TournamentTeam";
import {FightingTeamsGroup} from "./FightingTeamsGroup";
import {WinnerTree} from "./WinnerTree";
import {EntityIdGenerator} from "../../../../shared/core/application/EntityIdGenerator";

class NumberIdGeneratorStub {
}

export class TournamentTree {
    readonly tournamentTeams: TournamentTeam[];
    readonly tournamentTreeArray: FightingTeamsGroup[];
    readonly testTournamentId: string;


    private constructor(
        props: { testTournamentId: string, tournamentTreeArray: FightingTeamsGroup[], tournamentTeams: TournamentTeam[] }
    ) {
        this.tournamentTeams = props.tournamentTeams;
        this.tournamentTreeArray = props.tournamentTreeArray;
        this.testTournamentId = props.testTournamentId
    }

    static createSingleTournamentTree(
        props: {
            testTournamentId: string,
            tournamentTeams: TournamentTeam[],
            entityIdGenerator: EntityIdGenerator,
        }
    ): TournamentTree {
        const winnerTree = WinnerTree.createTournamentTree({
            tournamentTeams: props.tournamentTeams,
            entityIdGenerator: props.entityIdGenerator
        });
        const tournamentTreeProps = {
            testTournamentId: props.testTournamentId,
            tournamentTreeArray: winnerTree.getTournamentTreeArray(),
            tournamentTeams: props.tournamentTeams
        };
        return new TournamentTree(tournamentTreeProps);
    }

    public getTournamentTreeArray(): FightingTeamsGroup[] {
        return this.tournamentTreeArray;
    }
}
