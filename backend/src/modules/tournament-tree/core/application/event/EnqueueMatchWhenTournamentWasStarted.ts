import { EventHandler } from '../../../../../shared/core/application/event/EventHandler';
import { CommandPublisher } from '../../../../../shared/core/application/command/CommandBus';
import { EnqueueMatch } from '../../../../doubles-tournament/core/application/command/EnqueueMatch';
import { TournamentTreeRepository } from '../TournamentTreeRepository';
import { TournamentWasStarted } from '../../../../doubles-tournament/core/domain/event/TournamentWasStarted';

export class EnqueueMatchWhenTournamentWasStarted implements EventHandler<TournamentWasStarted> {
  constructor(private readonly commandPublisher: CommandPublisher, private readonly repository: TournamentTreeRepository) {}

  async handle(event: TournamentWasStarted): Promise<void> {
    const tournamentTree = await this.repository.findByTournamentTreeId(event.tournamentId);

    const matchesToEnqueue = tournamentTree?.getMatchesQueueReadyToStart();

    await matchesToEnqueue?.forEach((matchToEnqueue) => {
      this.commandPublisher.execute(
        new EnqueueMatch({
          tournamentId: event.tournamentId,
          matchNumber: matchToEnqueue.matchNumber,
          team1Id: matchToEnqueue.firstTeam.teamId.raw,
          team2Id: matchToEnqueue.secondTeam.teamId.raw,
        }),
      );
    });
  }
}
