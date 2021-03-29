import { EventHandler } from '../../../../../shared/core/application/event/EventHandler';
import { CommandPublisher } from '../../../../../shared/core/application/command/CommandBus';
import { MatchesQueueRepository } from '../MatchesQueueRepository';
import { TablesQueueRepository } from '../TablesQueueRepository';
import { TournamentTableWasReleased } from '../../../../tournament-tables/core/domain/event/TournamentTableWasReleased';
import { CallMatch } from '../command/CallMatch';
import { TournamentId } from '../../domain/TournamentId';
import { pushTableToQueue } from '../../domain/QueuedTable';
import { QueuedMatch } from '../../domain/QueuedMatch';
import { MatchesQueue } from '../../domain/MatchesQueue';

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
    await this.releaseTableInQueue({ tournamentId: tournamentId, tableNumber: event.tableNumber });

    const matches = await this.matchesQueueRepository.findByTournamentId(tournamentId);
    const matchToCall = matches ? this.findFirstMatchToCall(matches) : undefined;
    if (matchToCall) {
      await this.commandPublisher.execute(
        new CallMatch({
          tournamentId: tournamentId,
          calledMatch: {
            matchNumber: matchToCall.matchNumber.raw,
            team1Id: matchToCall.team1Id.raw,
            team2Id: matchToCall.team2Id.raw,
          },
          tableNumber: event.tableNumber,
        }),
      );
    }
  }

  private async releaseTableInQueue(props: { tournamentId: string; tableNumber: number }): Promise<void> {
    const tournamentId = TournamentId.from(props.tournamentId);
    const tournamentTable = {
      tableNumber: props.tableNumber,
      isFree: true,
    };
    const tablesQueue = await this.tablesQueueRepository.findByTournamentId(props.tournamentId);
    const queue = pushTableToQueue(tournamentId, tournamentTable, tablesQueue);
    await this.tablesQueueRepository.save(queue);
  }

  private findFirstMatchToCall(matches: MatchesQueue): QueuedMatch {
    const notStartedMatches = matches.queuedMatches.filter((match) => !match.started);
    const lowestMatchNumber = Math.min(...notStartedMatches.map((match) => match.matchNumber.raw));
    return notStartedMatches.filter((match) => match.matchNumber.raw === lowestMatchNumber)[0];
  }
}
