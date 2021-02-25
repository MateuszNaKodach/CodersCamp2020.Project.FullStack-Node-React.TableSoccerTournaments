export class CreateTournamentWithTeams {
    readonly tournamentId: string;
    readonly tournamentPairs: string[];

    constructor(tournamentId: string, tournamentPairs: string[]) {
        this.tournamentId = tournamentId;
        this.tournamentPairs = tournamentPairs;
    }
}