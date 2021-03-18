import { CommandHandler } from '../../../../../shared/core/application/command/CommandHandler';
import { BookTournamentTable } from './BookTournamentTable';
import { DomainEventPublisher } from '../../../../../shared/core/application/event/DomainEventBus';
import { CurrentTimeProvider } from '../../../../../shared/core/CurrentTimeProvider';
import { TournamentTablesRepository } from '../TournamentTablesRepository';
import { CommandResult } from '../../../../../shared/core/application/command/CommandResult';
import { TableNumber } from '../../domain/TableNumber';
import { bookTournamentTable } from '../../domain/TournamentTable';

export class BookTournamentTableCommandHandler implements CommandHandler<BookTournamentTable> {
  constructor(
    private readonly eventPublisher: DomainEventPublisher,
    private readonly currentTimeProvider: CurrentTimeProvider,
    private readonly repository: TournamentTablesRepository,
  ) {}

  async execute(applicationCommand: BookTournamentTable): Promise<CommandResult> {
    const tournamentId = applicationCommand.tournamentId;
    const tableNumber = applicationCommand.tableNumber;
    const tableToLock = await this.repository.findByTournamentIdAndTableNumber(tournamentId, tableNumber);
    const domainCommand = { tournamentId, tableNumber: TableNumber.from(tableNumber) };

    const { state, events } = bookTournamentTable(tableToLock, domainCommand, this.currentTimeProvider());
    await this.repository.save(state);
    this.eventPublisher.publishAll(events);
    return CommandResult.success();
  }
}
