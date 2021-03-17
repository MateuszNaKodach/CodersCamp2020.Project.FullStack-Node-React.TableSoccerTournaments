import { CommandHandler } from '../../../../../shared/core/application/command/CommandHandler';
import { CallMatch } from './CallMatch';
import { DomainEventPublisher } from '../../../../../shared/core/application/event/DomainEventBus';
import { CommandResult } from '../../../../../shared/core/application/command/CommandResult';
import { MatchWasCalled } from '../../domain/event/MatchWasCalled';
import { CurrentTimeProvider } from '../../../../../shared/core/CurrentTimeProvider';
import { CommandPublisher } from '../../../../../shared/core/application/command/CommandBus';
import { ExcludeFromAvailableTables } from '../../../../tournament-tables/core/application/command/ExcludeFromAvailableTables';

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
      tableNumber: command.tableNumber,
    });

    await this.commandPublisher.execute(new ExcludeFromAvailableTables(command.tournamentId, command.tableNumber));

    this.eventPublisher.publish(matchWasCalled);
    return CommandResult.success();
  }
}
