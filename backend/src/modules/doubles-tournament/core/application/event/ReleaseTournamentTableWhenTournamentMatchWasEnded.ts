import { TournamentMatchWasEnded } from '../../domain/event/TournamentMatchWasEnded';
import { EventHandler } from '../../../../../shared/core/application/event/EventHandler';
import { CommandPublisher } from '../../../../../shared/core/application/command/CommandBus';
import { ReleaseTournamentTable } from '../../../../tournament-tables/core/application/command/ReleaseTournamentTable';
import { MatchesQueueRepository } from '../MatchesQueueRepository';

export class ReleaseTournamentTableWhenTournamentMatchWasEnded implements EventHandler<TournamentMatchWasEnded> {
  constructor(private readonly commandPublisher: CommandPublisher, private readonly matchesQueueRepository: MatchesQueueRepository) {}

  async handle(event: TournamentMatchWasEnded): Promise<void> {
    const tournamentId = event.tournamentId;
    const matches = await this.matchesQueueRepository.findByTournamentId(tournamentId);
    const endedMatch = matches?.queuedMatches.find((match) => match.matchNumber.raw === event.matchNumber);
    const tableNumber = endedMatch?.tableNumber;
    if (tableNumber) {
      await this.commandPublisher.execute(new ReleaseTournamentTable(tournamentId, tableNumber));
    }
  }
}
