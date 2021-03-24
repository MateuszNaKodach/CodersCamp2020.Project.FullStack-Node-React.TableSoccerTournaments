import {EventHandler} from "../../../../../shared/core/application/event/EventHandler";
import {CommandPublisher} from "../../../../../shared/core/application/command/CommandBus";
import {EnqueueMatch} from "../command/EnqueueMatch";
import {TournamentTreeRepository} from "../../../../tournament-tree/core/application/TournamentTreeRepository";

export class EnqueueMatchWhenTournamentWasStarted implements EventHandler<TournamentWasStarted> {
    constructor(private readonly commandPublisher: CommandPublisher, private readonly repository: TournamentTreeRepository) {}

    async handle(event: TournamentWasStarted): Promise<void> {
        const tournamentTree = await this.repository.findByTournamentTreeId(event.tournamentId);

        const matchesToEnqueue = tournamentTree?.getMatchesQueueReadyToBegin()

        matchesToEnqueue?.forEach((matchToEnqueue) => {
                this.commandPublisher.execute(new EnqueueMatch({
                    tournamentId: event.tournamentId,
                    matchNumber: matchToEnqueue.matchNumberInSequence,
                    team1Id: matchToEnqueue.firstTeam?.teamId.raw,
                    team2Id: matchToEnqueue.secondTeam?.teamId.raw
                }));
            });
    }
}
