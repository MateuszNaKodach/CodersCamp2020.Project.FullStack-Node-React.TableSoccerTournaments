import {TournamentTable} from "../domain/TournamentTable";

export interface TournamentTablesRepository {
    save(tournamentTable: TournamentTable): Promise<void>;

    findByTableId(tableId: string): Promise<TournamentTable | undefined>;

    findByTournamentId(tournamentId: string): Promise<TournamentTable[] | undefined>;

    findAll(): Promise<TournamentTable[]>;
}
