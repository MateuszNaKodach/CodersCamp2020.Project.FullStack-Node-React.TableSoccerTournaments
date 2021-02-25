import {DomainEvent} from "../../../../../shared/domain/event/DomainEvent";

export class TournamentWithTeamsWasCreated implements DomainEvent{
    readonly occurredAt: Date;
    readonly tournamentId: string;
    readonly tournamentPairs: string[];

    constructor(occurredAt: Date, tournamentId: string, tournamentPairs: string[]) {
        this.occurredAt = occurredAt;
        this.tournamentId = tournamentId;
        this.tournamentPairs = tournamentPairs;
    }
}