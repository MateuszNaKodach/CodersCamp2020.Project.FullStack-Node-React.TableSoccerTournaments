import { EventHandler } from '../../../../../shared/core/application/event/EventHandler';
import { CommandPublisher } from '../../../../../shared/core/application/command/CommandBus';
import { MatchesQueueRepository } from '../MatchesQueueRepository';
import { TablesQueueRepository } from '../TablesQueueRepository';
import { CallMatch } from '../command/CallMatch';
import { MatchWasQueued } from '../../domain/event/MatchWasQueued';
import { QueuedTable } from '../../domain/QueuedTable';

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
    const freeTable = await this.findFreeTables(tournamentId);
    if (freeTable) {
      await this.commandPublisher.execute(
        new CallMatch({
          tournamentId: tournamentId,
          calledMatch: { matchNumber: event.matchNumber, team1Id: event.team1Id, team2Id: event.team2Id },
          tableNumber: freeTable.tableNumber,
        }),
      );
    }
  }

  private async findFreeTables(tournamentId: string): Promise<QueuedTable | undefined> {
    const { state: tablesQueue } = await this.tablesQueueRepository.findByTournamentId(tournamentId);
    return tablesQueue?.queuedTables.filter((table) => table.isFree)[0];
  }
}
