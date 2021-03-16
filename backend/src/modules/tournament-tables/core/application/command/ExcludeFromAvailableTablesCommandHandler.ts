import { CommandHandler } from '../../../../../shared/core/application/command/CommandHandler';
import { ExcludeFromAvailableTables } from './ExcludeFromAvailableTables';
import { DomainEventPublisher } from '../../../../../shared/core/application/event/DomainEventBus';
import { CurrentTimeProvider } from '../../../../../shared/core/CurrentTimeProvider';
import { TournamentTablesRepository } from '../TournamentTablesRepository';
import { CommandResult } from '../../../../../shared/core/application/command/CommandResult';
import { TableNumber } from '../../domain/TableNumber';
import { excludeFromAvailableTables } from '../../domain/TournamentTable';

export class ExcludeFromAvailableTablesCommandHandler implements CommandHandler<ExcludeFromAvailableTables> {
  constructor(
    private readonly eventPublisher: DomainEventPublisher,
    private readonly currentTimeProvider: CurrentTimeProvider,
    private readonly repository: TournamentTablesRepository,
  ) {}

  async execute(applicationCommand: ExcludeFromAvailableTables): Promise<CommandResult> {
    const tournamentId = applicationCommand.tournamentId;
    const tableNumber = applicationCommand.tableNumber;
    const tableToExclude = await this.repository.findByTournamentIdAndTableNumber(tournamentId, tableNumber);
    const domainCommand = { tournamentId, tableNumber: TableNumber.from(tableNumber) };

    const { state, events } = excludeFromAvailableTables(tableToExclude, domainCommand, this.currentTimeProvider());
    await this.repository.save(state);
    this.eventPublisher.publishAll(events);
    return CommandResult.success();
  }
}
