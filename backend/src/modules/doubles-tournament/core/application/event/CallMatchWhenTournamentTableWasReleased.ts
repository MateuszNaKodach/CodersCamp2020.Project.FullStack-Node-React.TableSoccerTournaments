import { EventHandler } from '../../../../../shared/core/application/event/EventHandler';
import { CommandPublisher } from '../../../../../shared/core/application/command/CommandBus';
import { MatchesQueueRepository } from '../MatchesQueueRepository';
import { TablesQueueRepository } from '../TablesQueueRepository';
import { TournamentTableWasReleased } from '../../../../tournament-tables/core/domain/event/TournamentTableWasReleased';
import { CallMatch } from '../command/CallMatch';

export class CallMatchWhenTournamentTableWasReleased implements EventHandler<TournamentTableWasReleased> {
  private readonly commandPublisher: CommandPublisher;
  private readonly matchesQueueRepository: MatchesQueueRepository;
  private readonly tablesQueueRepository: TablesQueueRepository;

  constructor(
    commandPublisher: CommandPublisher,
    matchesQueueRepository: MatchesQueueRepository,
    tablesQueueRepository: TablesQueueRepository,
  ) {
    this.commandPublisher = commandPublisher;
    this.matchesQueueRepository = matchesQueueRepository;
    this.tablesQueueRepository = tablesQueueRepository;
  }

  async handle(event: TournamentTableWasReleased): Promise<void> {
    const tournamentId = event.tournamentId;
    const notStartedMatches = await this.matchesQueueRepository.findNotStartedMatchesByTournamentId(event.tournamentId);
    if (notStartedMatches.length > 0) {
      const lowestMatchNumber = Math.min(...notStartedMatches.map((match) => match.matchNumber.raw));
      const firstMatchToCall = notStartedMatches.filter((match) => match.matchNumber.raw === lowestMatchNumber)[0];
      await this.commandPublisher.execute(
        new CallMatch({
          tournamentId: tournamentId,
          calledMatch: {
            matchNumber: firstMatchToCall.matchNumber.raw,
            team1Id: firstMatchToCall.team1Id.raw,
            team2Id: firstMatchToCall.team2Id.raw,
          },
          tableNumber: event.tableNumber,
        }),
      );
    }
  }
}
