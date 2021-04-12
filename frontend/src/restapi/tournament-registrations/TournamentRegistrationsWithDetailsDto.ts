export type TournamentRegistrationsWithDetailsDto = {
    readonly tournamentId: string;
    readonly tournamentName: string;
    readonly status: string;
    readonly registeredPlayersIds: string[];
};
