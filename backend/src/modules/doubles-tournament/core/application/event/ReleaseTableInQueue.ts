import { TournamentTableWasReleased } from '../../../../tournament-tables/core/domain/event/TournamentTableWasReleased';
import { EventHandler } from '../../../../../shared/core/application/event/EventHandler';
import { TablesQueueRepository } from '../TablesQueueRepository';
import { pushTableToQueue } from '../../domain/QueuedTable';
import { TournamentId } from '../../domain/TournamentId';

export class ReleaseTableInQueue implements EventHandler<TournamentTableWasReleased> {
  private readonly tablesQueueRepository: TablesQueueRepository;

  constructor(tablesQueueRepository: TablesQueueRepository) {
    this.tablesQueueRepository = tablesQueueRepository;
  }

  async handle(event: TournamentTableWasReleased): Promise<void> {
    const tournamentId = TournamentId.from(event.tournamentId);
    const tournamentTable = {
      tableNumber: event.tableNumber,
      isFree: true,
    };
    const { state: tablesQueue, version } = await this.tablesQueueRepository.findByTournamentId(tournamentId.raw);
    const queue = pushTableToQueue(tournamentId, tournamentTable, tablesQueue);

    await this.tablesQueueRepository.save(queue, version);
  }
}
