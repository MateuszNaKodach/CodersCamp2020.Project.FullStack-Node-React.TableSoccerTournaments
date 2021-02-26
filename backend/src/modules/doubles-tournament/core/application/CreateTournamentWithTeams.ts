export class CreateTournamentWithTeams {
    readonly tournamentId: string;
    readonly tournamentTeams: TournamentTeam[];


    constructor(tournamentId: string, tournamentTeams: TournamentTeam[]) {
        this.tournamentId = tournamentId;
        this.tournamentTeams = tournamentTeams;
    }
}

export class TournamentTeam {
    readonly teamId: string;
    readonly firstTeamPlayer: string;
    readonly secondTeamPlayer: string;


    constructor(teamId: string, firstTeamPlayer: string, secondTeamPlayer: string) {
        this.teamId = teamId;
        this.firstTeamPlayer = firstTeamPlayer;
        this.secondTeamPlayer = secondTeamPlayer;
    }
}