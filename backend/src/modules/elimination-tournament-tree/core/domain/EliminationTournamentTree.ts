// import {TournamentTeam} from "../../../doubles-tournament/core/domain/TournamentTeam";

import {TournamentTeam} from "./TournamentTeam";

export class EliminationTournamentTree {
    readonly tournamentId: string;
    readonly tournamentTeams: TournamentTeam[];

    constructor(
        props: { tournamentId: string; tournamentTeams: TournamentTeam[] }
    ) {
        this.tournamentId = props.tournamentId;
        this.tournamentTeams = props.tournamentTeams;
    }
}