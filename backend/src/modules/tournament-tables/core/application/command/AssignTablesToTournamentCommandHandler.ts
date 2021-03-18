import { CommandHandler } from '../../../../../shared/core/application/command/CommandHandler';
import { DomainEventPublisher } from '../../../../../shared/core/application/event/DomainEventBus';
import { CurrentTimeProvider } from '../../../../../shared/core/CurrentTimeProvider';
import { CommandResult } from '../../../../../shared/core/application/command/CommandResult';
import { AssignTablesToTournament } from './AssignTablesToTournament';
import { TournamentTablesRepository } from '../TournamentTablesRepository';
import { assignTablesToTournament } from '../../domain/TournamentTable';
import { TableNumber } from '../../domain/TableNumber';
import { isDefined } from '../../../../../common/Defined';

export class AssignTablesToTournamentCommandHandler implements CommandHandler<AssignTablesToTournament> {
  constructor(
    private readonly eventPublisher: DomainEventPublisher,
    private readonly currentTimeProvider: CurrentTimeProvider,
    private readonly repository: TournamentTablesRepository,
  ) {}

  async execute(applicationCommand: AssignTablesToTournament): Promise<CommandResult> {
    const tournamentId = applicationCommand.tournamentId;
    const tournamentTables = await this.repository.findAllByTournamentId(tournamentId);
    const tablesToAssign = applicationCommand.tables.map((table) => {
      return {
        tableNumber: TableNumber.from(table.tableNumber),
        tableName: table.tableName,
        isFree: isDefined(table.isFree) ? table.isFree : true,
      };
    });
    const domainCommand = { tournamentId, tables: tablesToAssign };

    const { state, events } = assignTablesToTournament(tournamentTables, domainCommand, this.currentTimeProvider());
    await this.repository.saveAll(state);
    this.eventPublisher.publishAll(events);
    return CommandResult.success();
  }
}
