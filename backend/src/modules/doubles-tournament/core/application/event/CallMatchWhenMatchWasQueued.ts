import { EventHandler } from '../../../../../shared/core/application/event/EventHandler';
import { MatchWasQueued } from '../../domain/event/MatchWasQueued';
import { CommandPublisher } from '../../../../../shared/core/application/command/CommandBus';
import { MatchesQueueRepository } from '../MatchesQueueRepository';
import { TablesQueueRepository } from '../TablesQueueRepository';
import { CallMatch } from '../command/CallMatch';

export class CallMatchWhenMatchWasQueued implements EventHandler<MatchWasQueued> {
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

  async handle(event: MatchWasQueued): Promise<void> {
    const tournamentId = event.tournamentId;
    const freeTablesQueue = await this.tablesQueueRepository.findFreeTablesByTournamentId(event.tournamentId);
    if (freeTablesQueue && freeTablesQueue.length > 0) {
      await this.commandPublisher.execute(
        new CallMatch({
          tournamentId: tournamentId,
          calledMatch: { matchNumber: event.matchNumber, team1Id: event.team1Id, team2Id: event.team2Id },
          tableNumber: freeTablesQueue[0].tableNumber,
        }),
      );
    }
  }
}
