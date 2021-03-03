import {TournamentTeam} from "../../domain/TournamentTeam";
import {EntityIdGenerator} from "../../../../../shared/core/application/EntityIdGenerator";
import {DomainCommandResult} from "../../../../../shared/core/domain/DomainCommandResult";
import {TeamId} from "../../../../doubles-tournament/core/domain/TeamId";
import {TournamentWithTeamsWasCreated} from "../../../../doubles-tournament/core/domain/event/TournamentWithTeamsWasCreated";
import {DoublesTournament} from "../../../../doubles-tournament/core/domain/DoublesTournament";

export class CreateTournamentTree {
    readonly tournamentTeams: TournamentTeam[];

    constructor(props: { tournamentId: string; tournamentTeams: TournamentTeam[] }) {
        this.tournamentTeams = props.tournamentTeams;
    }
}

