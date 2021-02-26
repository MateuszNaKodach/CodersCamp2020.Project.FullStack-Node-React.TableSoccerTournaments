import {TournamentTeam} from "../domain/TournamentTeam";

export class CreateTournamentWithTeams {
    readonly tournamentId: string;
    readonly tournamentTeams: TournamentTeam[];


    constructor(tournamentId: string, tournamentTeams: TournamentTeam[]) {
        this.tournamentId = tournamentId;
        this.tournamentTeams = tournamentTeams;
    }
}