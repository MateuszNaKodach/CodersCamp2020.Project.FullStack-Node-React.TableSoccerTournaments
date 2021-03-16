import { CommandHandler } from '../../../../../shared/core/application/command/CommandHandler';
import { DomainEventPublisher } from '../../../../../shared/core/application/event/DomainEventBus';
import { CurrentTimeProvider } from '../../../../../shared/core/CurrentTimeProvider';
import { CommandResult } from '../../../../../shared/core/application/command/CommandResult';
import { AssignTournamentTables } from './AssignTournamentTables';
import { TournamentTablesRepository } from '../TournamentTablesRepository';
import { assignTablesToTournament, TournamentTable } from '../../domain/TournamentTable';
import { TableNumber } from '../../domain/TableNumber';

export class AssignTournamentTablesCommandHandler implements CommandHandler<AssignTournamentTables> {
  constructor(
    private readonly eventPublisher: DomainEventPublisher,
    private readonly currentTimeProvider: CurrentTimeProvider,
    private readonly repository: TournamentTablesRepository,
  ) {}

  async execute(applicationCommand: AssignTournamentTables): Promise<CommandResult> {
    const tournamentId = applicationCommand.tournamentId;
    const tournamentTables = await this.repository.findAllByTournamentId(tournamentId);
    const tablesToAssign = applicationCommand.tables.map((table) => {
      return {
        tableNumber: TableNumber.from(table.tableNumber),
        tableName: table.tableName,
      };
    });
    const domainCommand = { tournamentId, tables: tablesToAssign };

    const { state, events } = assignTablesToTournament(tournamentTables, domainCommand, this.currentTimeProvider());
    await this.repository.saveAll(state);
    this.eventPublisher.publishAll(events);
    return CommandResult.success();
  }
}
