export class TournamentDetailsDto {
    readonly tournamentId: string;
    readonly tournamentName: string;

    constructor(tournamentId: string, tournamentName: string) {
        this.tournamentId = tournamentId;
        this.tournamentName = tournamentName;
    }
}
