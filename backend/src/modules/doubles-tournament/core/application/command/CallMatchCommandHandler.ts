import { CommandHandler } from '../../../../../shared/core/application/command/CommandHandler';
import { CallMatch } from './CallMatch';
import { DomainEventPublisher } from '../../../../../shared/core/application/event/DomainEventBus';
import { CommandResult } from '../../../../../shared/core/application/command/CommandResult';
import { MatchWasCalled } from '../../domain/event/MatchWasCalled';
import { CurrentTimeProvider } from '../../../../../shared/core/CurrentTimeProvider';
import { CommandPublisher } from '../../../../../shared/core/application/command/CommandBus';
import { BookTournamentTable } from '../../../../tournament-tables/core/application/command/BookTournamentTable';

export class CallMatchCommandHandler implements CommandHandler<CallMatch> {
  constructor(
    private readonly eventPublisher: DomainEventPublisher,
    private readonly currentTimeProvider: CurrentTimeProvider,
    private readonly commandPublisher: CommandPublisher,
  ) {}

  async execute(command: CallMatch): Promise<CommandResult> {
    const bookTable = await this.commandPublisher.execute(new BookTournamentTable(command.tournamentId, command.tableNumber));

    if (!bookTable.isSuccess()) {
      return CommandResult.failureDueTo(
        new Error(`Match cannot be called on this table, because table nr ${command.tableNumber} has been already booked!`),
      );
    }

    const matchWasCalled = new MatchWasCalled({
      occurredAt: this.currentTimeProvider(),
      tournamentId: command.tournamentId,
      calledMatch: command.calledMatch,
      tableNumber: command.tableNumber,
    });
    this.eventPublisher.publish(matchWasCalled);
    return CommandResult.success();
  }
}
