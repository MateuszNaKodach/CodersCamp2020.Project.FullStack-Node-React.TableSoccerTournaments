import { DomainEventPublisher } from '../../../../../shared/core/application/event/DomainEventBus';
import { CurrentTimeProvider } from '../../../../../shared/core/CurrentTimeProvider';
import { TournamentTablesRepository } from '../TournamentTablesRepository';
import { CommandResult } from '../../../../../shared/core/application/command/CommandResult';
import { TableNumber } from '../../domain/TableNumber';
import { includeInAvailableTables } from '../../domain/TournamentTable';
import { IncludeInAvailableTables } from './IncludeInAvailableTables';

export class IncludeInAvailableTablesCommandHandler {
  constructor(
    private readonly eventPublisher: DomainEventPublisher,
    private readonly currentTimeProvider: CurrentTimeProvider,
    private readonly repository: TournamentTablesRepository,
  ) {}

  async execute(applicationCommand: IncludeInAvailableTables): Promise<CommandResult> {
    const tournamentId = applicationCommand.tournamentId;
    const tableNumber = applicationCommand.tableNumber;
    const tableToInclude = await this.repository.findByTournamentIdAndTableNumber(tournamentId, tableNumber);
    const domainCommand = { tournamentId, tableNumber: TableNumber.from(tableNumber) };

    const { state, events } = includeInAvailableTables(tableToInclude, domainCommand, this.currentTimeProvider());
    await this.repository.save(state);
    this.eventPublisher.publishAll(events);
    return CommandResult.success();
  }
}
