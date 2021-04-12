export class TournamentName {
    private readonly TYPE = 'TournamentName';

    private constructor(readonly raw: string) {}

    static from(tournamentName: string): TournamentName {
        if (tournamentName.length <= 0) {
            throw new Error('TournamentName cannot be empty!');
        }
        return new TournamentName(tournamentName);
    }
}
