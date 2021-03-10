import {TournamentTree} from "../TournamentTree";

export class TournamentTreeWasCreated {
    readonly tournamentId: string;
    readonly tournamentTree: TournamentTree;
    readonly occurredAt: Date;

    // readonly tournamentTree: {}[];

    constructor(tournamentId: string, tournamentTree: TournamentTree, occurredAt: Date) {
        this.tournamentId = tournamentId;
        this.tournamentTree = tournamentTree;
        this.occurredAt = occurredAt;
    }

}