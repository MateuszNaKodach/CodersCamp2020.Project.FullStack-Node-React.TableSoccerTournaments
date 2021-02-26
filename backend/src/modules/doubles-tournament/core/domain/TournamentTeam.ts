export class TournamentTeam {
    readonly teamId: string;
    firstTeamPlayer: string;
    secondTeamPlayer: string;


    constructor(teamId: string, firstTeamPlayer: string, secondTeamPlayer: string) {
        this.teamId = teamId;
        this.firstTeamPlayer = firstTeamPlayer;
        this.secondTeamPlayer = secondTeamPlayer;
    }
}