import {TournamentTeam} from "./TournamentTeam";
import {TournamentWithTeamsWasCreated} from "./event/TournamentWithTeamsWasCreated";
import {DomainEvent} from "../../../../shared/domain/event/DomainEvent";

export function createTournamentWithTeams(
    command: { tournamentId: string; tournamentTeams: TournamentTeam[] },
    currentTime: Date,
): { events: DomainEvent[] } {
    return {
        events: [new TournamentWithTeamsWasCreated(currentTime, command.tournamentId, command.tournamentTeams)],
    };
}



