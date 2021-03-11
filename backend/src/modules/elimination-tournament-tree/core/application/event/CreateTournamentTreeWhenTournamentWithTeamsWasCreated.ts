import {EventHandler} from "../../../../../shared/core/application/event/EventHandler";
import {TournamentWithTeamsWasCreated} from "../../../../doubles-tournament/core/domain/event/TournamentWithTeamsWasCreated";
import {CommandPublisher} from "../../../../../shared/core/application/command/CommandBus";
import {CreateTournamentTree} from "../command/CreateTournamentTree";
import {TournamentTeam} from "../../domain/TournamentTeam";
import {tournamentRegistrationsRouter} from "../../../../tournaments-registrations/presentation/rest-api/TournamentRegistrationsRouter";
import {generateTournamentTeamsList} from "../../../../../../test/modules/elimination-tournament-tree/core/domain/TouramentTeamsListGenerator";

export class CreateTournamentTreeWhenTournamentWithTeamsWasCreated implements EventHandler<TournamentWithTeamsWasCreated> {
    constructor(
        private readonly commandPublisher: CommandPublisher,
    ) {
    }

    async handle(event: TournamentWithTeamsWasCreated): Promise<void> {
// event.tournamentTeams.
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