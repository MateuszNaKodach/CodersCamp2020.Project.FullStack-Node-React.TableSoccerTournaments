// import {TournamentTeam} from "../../../doubles-tournament/core/domain/TournamentTeam";

import {TournamentTeam} from "./TournamentTeam";
import {DoublesTournament} from "../../../doubles-tournament/core/domain/DoublesTournament";
import {EntityIdGenerator} from "../../../../shared/core/application/EntityIdGenerator";
import {DomainCommandResult} from "../../../../shared/core/domain/DomainCommandResult";
import {TeamId} from "../../../doubles-tournament/core/domain/TeamId";
import {TournamentWithTeamsWasCreated} from "../../../doubles-tournament/core/domain/event/TournamentWithTeamsWasCreated";

export class TournamentTree {
    readonly tournamentTeams: TournamentTeam[];

    constructor(
        props: { tournamentTeams: TournamentTeam[] }
    ) {
        this.tournamentTeams = props.tournamentTeams;
    }

}

export function createTournamentTree(
    state: DoublesTournament | undefined,
    command: { tournamentId: string; tournamentPairs: { player1: string; player2: string }[] },
    currentTime: Date,
    entityIdGenerator: EntityIdGenerator,
): DomainCommandResult<DoublesTournament> {
    if (state !== undefined) {
        throw new Error('This tournament already exists.');
    }
    if (command.tournamentPairs.length < 2) {
        throw new Error('Tournament must have at least 2 pairs of players.');
    }

    const tournamentTeams: TournamentTeam[] = command.tournamentPairs.map((tournamentPair) => {
        const teamId = entityIdGenerator.generate();
        return new TournamentTeam({
            teamId: TeamId.from(teamId),
            firstTeamPlayer: tournamentPair.player1,
            secondTeamPlayer: tournamentPair.player2,
        });
    });

    const tournamentWithTeamsWasCreated = new TournamentWithTeamsWasCreated({
        occurredAt: currentTime,
        tournamentId: command.tournamentId,
        tournamentTeams,
    });

    const createdTournamentWithTeams = onTournamentWithTeamsWasCreated(state, tournamentWithTeamsWasCreated);

    return {
        state: createdTournamentWithTeams,
        events: [tournamentWithTeamsWasCreated],
    };
}