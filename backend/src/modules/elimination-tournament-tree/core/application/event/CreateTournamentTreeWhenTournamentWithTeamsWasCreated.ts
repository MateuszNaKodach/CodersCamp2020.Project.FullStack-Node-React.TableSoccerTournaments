import {EventHandler} from "../../../../../shared/core/application/event/EventHandler";
import {TournamentWithTeamsWasCreated} from "../../../../doubles-tournament/core/domain/event/TournamentWithTeamsWasCreated";
import {CommandPublisher} from "../../../../../shared/core/application/command/CommandBus";
import {CreateTournamentTree} from "../command/CreateTournamentTree";
import {TournamentTeam} from "../../domain/TournamentTeam";

export class CreateTournamentTreeWhenTournamentWithTeamsWasCreated implements EventHandler<TournamentWithTeamsWasCreated> {
    constructor(
        private readonly commandPublisher: CommandPublisher,
    ) {
    }

    async handle(event: TournamentWithTeamsWasCreated): Promise<void> {
// event.tournamentTeams.

        await this.commandPublisher.execute(new CreateTournamentTree({
            tournamentId: event.tournamentId,
            tournamentTeams: event.tournamentTeams
        }))
    }


}