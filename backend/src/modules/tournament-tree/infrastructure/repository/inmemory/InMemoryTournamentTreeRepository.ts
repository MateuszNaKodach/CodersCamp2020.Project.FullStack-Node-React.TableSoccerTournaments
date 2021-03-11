import {TournamentTreeRepository} from "../../../core/application/TournamentTreeRepository";
import {DoublesTournament} from "../../../../doubles-tournament/core/domain/DoublesTournament";
// import {Promise} from "mongoose";
import {TournamentTree} from "../../../core/domain/TournamentTree";

export class InMemoryTournamentTreeRepository implements TournamentTreeRepository {
    private readonly entities: { [id: string]: TournamentTree } = {};

    async save(tournamentTree: TournamentTree): Promise<void> {
        this.entities[tournamentTree.tournamentId] = tournamentTree;
    }

    // async save(tournamentTree: TournamentTree): Promise<void> {
    //     this.entities[tournamentTree.tournamentId] = tournamentTree;
    // }

    // findAll(): Promise<DoublesTournament[]> {
    //     return Promise.resolve(Object.keys(this.entities).map((id) => this.entities[id]));
    // }

    findByTournamentTreeId(tournamentTreeId: string): Promise<TournamentTree> {
        return Promise.resolve(this.entities[tournamentTreeId]);
    }
}
