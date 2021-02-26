import {EventHandler} from "../../../../shared/core/application/event/EventHandler";
import {PlayersWereMatchedIntoTeams} from "../../../players-matching/core/domain/PlayersWereMatchedIntoTeams";
import {CommandPublisher} from "../../../../shared/core/application/command/CommandBus";
import {TournamentTeam} from "../domain/TournamentTeam";
import {CreateTournamentWithTeams} from "./CreateTournamentWithTeams";

export class CreateTournamentWhenPlayersWereMatchedIntoTeams implements EventHandler<PlayersWereMatchedIntoTeams> {
    constructor(private readonly commandPublisher: CommandPublisher) {}

    async handle(event: PlayersWereMatchedIntoTeams): Promise<void> {
        const team: TournamentTeam = new TournamentTeam('', '', '');
        const tournamentTeams: TournamentTeam[] = event.tournamentPair.map(tournamentPair => {
            team.firstTeamPlayer = tournamentPair.player1;
            team.secondTeamPlayer = tournamentPair.player2;
            return team;
        });
        await this.commandPublisher.execute(new CreateTournamentWithTeams(event.tournamentId, tournamentTeams));
    }
}

