import {TournamentDetails} from "../domain/TournamentDetails";

export interface TournamentDetailsRepository {
    save(tournamentDetails: TournamentDetails): Promise<void>;

    findByTournamentId(tournamentId: string): Promise<TournamentDetails | undefined>;

    findAll(): Promise<TournamentDetails[]>;
}