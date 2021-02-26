import {DomainEvent} from "../../../../../shared/domain/event/DomainEvent";
import {TournamentTeam} from "../../application/CreateTournamentWithTeams";

export class TournamentWithTeamsWasCreated implements DomainEvent{
    readonly occurredAt: Date;
    readonly tournamentId: string;
    readonly tournamentTeams: TournamentTeam[];

    constructor(occurredAt: Date, tournamentId: string, tournamentTeams: TournamentTeam[]) {
        this.occurredAt = occurredAt;
        this.tournamentId = tournamentId;
        this.tournamentTeams = tournamentTeams;
    }
}