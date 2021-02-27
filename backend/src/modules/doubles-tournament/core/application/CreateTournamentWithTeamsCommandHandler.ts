import { CommandHandler } from '../../../../shared/core/application/command/CommandHandler';
import { DomainEventPublisher } from '../../../../shared/core/application/event/DomainEventBus';
import { CurrentTimeProvider } from '../../../../shared/core/CurrentTimeProvider';
import { CreateTournamentWithTeams } from './CreateTournamentWithTeams';
import { CommandResult } from '../../../../shared/core/application/command/CommandResult';
import { createTournamentWithTeams } from '../domain/DoublesTournament';

export class CreateTournamentWithTeamsCommandHandler implements CommandHandler<CreateTournamentWithTeams> {
  constructor(private readonly eventPublisher: DomainEventPublisher, private readonly currentTimeProvider: CurrentTimeProvider) {}

  async execute(command: CreateTournamentWithTeams): Promise<CommandResult> {
    const { events } = createTournamentWithTeams(command, this.currentTimeProvider());
    this.eventPublisher.publishAll(events);
    return CommandResult.success();
  }
}
