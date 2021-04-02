import { EventHandler } from '../../../../../shared/core/application/event/EventHandler';
import { TablesQueueRepository } from '../TablesQueueRepository';
import { pushTableToQueue } from '../../domain/QueuedTable';
import { TournamentId } from '../../domain/TournamentId';
import { TournamentTableWasBooked } from '../../../../tournament-tables/core/domain/event/TournamentTableWasBooked';

export class BookTableInQueue implements EventHandler<TournamentTableWasBooked> {
  constructor(private readonly tablesQueueRepository: TablesQueueRepository) {}

  async handle(event: TournamentTableWasBooked): Promise<void> {
    const tournamentId = TournamentId.from(event.tournamentId);
    const tournamentTable = {
      tableNumber: event.tableNumber,
      isFree: false,
    };
    const tablesQueue = await this.tablesQueueRepository.findByTournamentId(tournamentId.raw);
    const queue = pushTableToQueue(tournamentId, tournamentTable, tablesQueue);

    await this.tablesQueueRepository.save(queue);
  }
}
