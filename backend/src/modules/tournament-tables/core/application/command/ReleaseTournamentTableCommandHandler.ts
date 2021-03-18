import { DomainEventPublisher } from '../../../../../shared/core/application/event/DomainEventBus';
import { CurrentTimeProvider } from '../../../../../shared/core/CurrentTimeProvider';
import { TournamentTablesRepository } from '../TournamentTablesRepository';
import { CommandResult } from '../../../../../shared/core/application/command/CommandResult';
import { TableNumber } from '../../domain/TableNumber';
import { releaseTournamentTable } from '../../domain/TournamentTable';
import { ReleaseTournamentTable } from './ReleaseTournamentTable';

export class ReleaseTournamentTableCommandHandler {
  constructor(
    private readonly eventPublisher: DomainEventPublisher,
    private readonly currentTimeProvider: CurrentTimeProvider,
    private readonly repository: TournamentTablesRepository,
  ) {}

  async execute(applicationCommand: ReleaseTournamentTable): Promise<CommandResult> {
    const tournamentId = applicationCommand.tournamentId;
    const tableNumber = applicationCommand.tableNumber;
    const tableToRelease = await this.repository.findByTournamentIdAndTableNumber(tournamentId, tableNumber);
    const domainCommand = { tournamentId, tableNumber: TableNumber.from(tableNumber) };

    const { state, events } = releaseTournamentTable(tableToRelease, domainCommand, this.currentTimeProvider());
    await this.repository.save(state);
    this.eventPublisher.publishAll(events);
    return CommandResult.success();
  }
}
