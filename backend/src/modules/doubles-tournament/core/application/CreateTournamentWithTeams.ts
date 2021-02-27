export class CreateTournamentWithTeams {
    readonly tournamentId: string;
    readonly tournamentPairs: { player1: string, player2: string }[];


    constructor(tournamentId: string, tournamentPairs: { player1: string, player2: string }[]) {
        this.tournamentId = tournamentId;
        this.tournamentPairs = tournamentPairs;
    }
}