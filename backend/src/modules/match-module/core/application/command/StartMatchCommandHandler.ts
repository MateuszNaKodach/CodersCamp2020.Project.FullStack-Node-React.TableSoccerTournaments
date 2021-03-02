import { CommandHandler } from '../../../../../shared/core/application/command/CommandHandler';
import { StartMatch } from './StartMatch';
import { DomainEventPublisher } from '../../../../../shared/core/application/event/DomainEventBus';
import { CurrentTimeProvider } from '../../../../../shared/core/CurrentTimeProvider';
import { CommandResult } from '../../../../../shared/core/application/command/CommandResult';
import { startMatch } from '../../domain/Match';

export class StartMatchCommandHandler implements CommandHandler<StartMatch> {
  constructor(private readonly eventPublisher: DomainEventPublisher, private readonly currentTimeProvider: CurrentTimeProvider) {}

  async execute(command: StartMatch): Promise<CommandResult> {
    const { events } = startMatch(command, this.currentTimeProvider());
    this.eventPublisher.publishAll(events);
    return CommandResult.success();
  }
}
