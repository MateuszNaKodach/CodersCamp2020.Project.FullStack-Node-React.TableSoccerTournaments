import {TournamentTree} from "../TournamentTree";

export class TournamentTreeWasCreated {
    readonly tournamentId: string;
    readonly occurredAt: Date;

    // readonly tournamentTree: {}[];

    constructor(tournamentId: string,  occurredAt: Date) {
        this.tournamentId = tournamentId;
        this.occurredAt = occurredAt;
    }

}