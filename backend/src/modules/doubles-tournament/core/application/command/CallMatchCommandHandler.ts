import { CommandHandler } from '../../../../../shared/core/application/command/CommandHandler';
import { CallMatch } from './CallMatch';
import { DomainEventPublisher } from '../../../../../shared/core/application/event/DomainEventBus';
import { CommandResult } from '../../../../../shared/core/application/command/CommandResult';
import { MatchWasCalled } from '../../domain/event/MatchWasCalled';
import { CurrentTimeProvider } from '../../../../../shared/core/CurrentTimeProvider';
import { CommandPublisher } from '../../../../../shared/core/application/command/CommandBus';
import { AssignTournamentTables } from '../../../../tournament-tables/core/application/command/AssignTournamentTables';

export class CallMatchCommandHandler implements CommandHandler<CallMatch> {
  constructor(
    private readonly eventPublisher: DomainEventPublisher,
    private readonly currentTimeProvider: CurrentTimeProvider,
    private readonly commandPublisher: CommandPublisher,
  ) {}

  async execute(command: CallMatch): Promise<CommandResult> {
    const matchWasCalled = new MatchWasCalled({
      occurredAt: this.currentTimeProvider(),
      tournamentId: command.tournamentId,
      matchFromQueue: command.matchFromQueue,
      table: command.table,
    });

    const tableNumber = command.table.tableNumber;
    const tableName = command.table.tableName;
    const availableToPlay: boolean = command.table.availableToPlay;
    const tableToAssign: { tableNumber: number; tableName: string; availableToPlay?: boolean }[] = [
      { tableNumber, tableName, availableToPlay },
    ];

    await this.commandPublisher.execute(new AssignTournamentTables(command.tournamentId, tableToAssign));

    this.eventPublisher.publish(matchWasCalled);
    return CommandResult.success();
  }
}
