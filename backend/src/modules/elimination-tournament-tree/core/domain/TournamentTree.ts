import {TournamentTeam} from "./TournamentTeam";
import {EntityIdGenerator} from "../../../../shared/core/application/EntityIdGenerator";

export class TournamentTree {
    readonly tournamentTeams: TournamentTeam[];

    constructor(
        props: { tournamentTeams: TournamentTeam[] }
    ) {
        this.tournamentTeams = props.tournamentTeams;
    }

}

export function createTournamentTree(
    props: {
        tournamentTeams: TournamentTeam[],
        entityIdGenerator: EntityIdGenerator,
    }) {


    return true;
}