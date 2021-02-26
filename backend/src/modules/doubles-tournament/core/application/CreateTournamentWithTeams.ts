export class CreateTournamentWithTeams {
    readonly tournamentId: string;
    readonly tournamentTeams: TournamentTeam[];


    constructor(tournamentId: string, tournamentTeams: TournamentTeam[]) {
        this.tournamentId = tournamentId;
        this.tournamentTeams = tournamentTeams;
    }
}

export class TournamentTeam {
    readonly tournamentId: string;
    readonly teamId: string;
    readonly firstTeamPlayer: string;
    readonly secondTeamPlayer: string;


    constructor(tournamentId: string, teamId: string, firstTeamPlayer: string, secondTeamPlayer: string) {
        this.tournamentId = tournamentId;
        this.teamId = teamId;
        this.firstTeamPlayer = firstTeamPlayer;
        this.secondTeamPlayer = secondTeamPlayer;
    }
}