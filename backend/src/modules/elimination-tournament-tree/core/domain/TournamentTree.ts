import {TournamentTeam} from "./TournamentTeam";
import {FightingTeamsGroup} from "./FightingTeamsGroup";
import {WinnerTree} from "./WinnerTree";
import {EntityIdGenerator} from "../../../../shared/core/application/EntityIdGenerator";

export class TournamentTree {
    readonly tournamentTeams: TournamentTeam[];
    readonly tournamentTreeArray: FightingTeamsGroup[];

    private constructor(
        props: { tournamentTreeArray: FightingTeamsGroup[], tournamentTeams: TournamentTeam[] }
    ) {
        this.tournamentTeams = props.tournamentTeams;
        this.tournamentTreeArray = props.tournamentTreeArray;
    }

    static createSingleTournamentTree(
        props: {
            tournamentTeams: TournamentTeam[],
            entityIdGenerator: EntityIdGenerator,
        }
    ): TournamentTree {
        const winnerTree = WinnerTree.createTournamentTree({
            tournamentTeams: props.tournamentTeams,
            entityIdGenerator: props.entityIdGenerator
        });
        const tournamentTreeProps = {
            tournamentTreeArray: winnerTree.getTournamentTreeArray(),
            tournamentTeams: props.tournamentTeams
        };
        return new TournamentTree(tournamentTreeProps);
    }

    public getTournamentTreeArray(): FightingTeamsGroup[] {
        return this.tournamentTreeArray;
    }
}
