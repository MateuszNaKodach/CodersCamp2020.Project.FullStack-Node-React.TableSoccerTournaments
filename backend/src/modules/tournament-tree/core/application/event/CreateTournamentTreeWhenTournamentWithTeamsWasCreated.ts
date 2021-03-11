import {EventHandler} from "../../../../../shared/core/application/event/EventHandler";
import {TournamentWithTeamsWasCreated} from "../../../../doubles-tournament/core/domain/event/TournamentWithTeamsWasCreated";
import {CommandPublisher} from "../../../../../shared/core/application/command/CommandBus";
import {CreateTournamentTree} from "../command/CreateTournamentTree";

export class CreateTournamentTreeWhenTournamentWithTeamsWasCreated implements EventHandler<TournamentWithTeamsWasCreated> {
    constructor(
        private readonly commandPublisher: CommandPublisher,
    ) {
    }

    async handle(event: TournamentWithTeamsWasCreated): Promise<void> {
        
        const tournamentTeams = event.tournamentTeams.map((team) => {
            return {
                teamId: team.teamId,
                firstTeamPlayer: team.firstTeamPlayerId,
                secondTeamPlayer: team.secondTeamPlayerId
            }
        })

        await this.commandPublisher.execute(new CreateTournamentTree({
            tournamentId: event.tournamentId,
            tournamentTeams:tournamentTeams

        }))
    }
}