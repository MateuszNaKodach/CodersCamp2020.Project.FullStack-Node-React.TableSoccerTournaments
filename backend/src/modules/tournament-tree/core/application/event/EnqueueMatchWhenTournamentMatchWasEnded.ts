import { EventHandler } from '../../../../../shared/core/application/event/EventHandler';
import { CommandPublisher } from '../../../../../shared/core/application/command/CommandBus';
import { EnqueueMatch } from '../../../../doubles-tournament/core/application/command/EnqueueMatch';
import { TournamentTreeRepository } from '../TournamentTreeRepository';
import { TournamentMatchWasEnded } from '../../../../doubles-tournament/core/domain/event/TournamentMatchWasEnded';

export class EnqueueMatchWhenTournamentMatchWasEnded implements EventHandler<TournamentMatchWasEnded> {
  constructor(private readonly commandPublisher: CommandPublisher, private readonly repository: TournamentTreeRepository) {}

  async handle(event: TournamentMatchWasEnded): Promise<void> {
    const matchNumber = event.matchNumber;
    const winnerId = event.winnerId;
    const tournamentTree = await this.repository.findByTournamentTreeId(event.tournamentId);

    if (tournamentTree) {
      const { treeWithFinishedMatch, matchToEnqueue } = tournamentTree?.finishMatchInTreeAndGetNextOne(matchNumber, winnerId);
      await this.repository.save(treeWithFinishedMatch);
      if (matchToEnqueue) {
        await this.commandPublisher.execute(
          new EnqueueMatch({
            tournamentId: event.tournamentId,
            matchNumber: matchToEnqueue.matchNumber,
            team1Id: matchToEnqueue.firstTeam.teamId.raw,
            team2Id: matchToEnqueue.secondTeam.teamId.raw,
          }),
        );
      }
    }
  }
}
