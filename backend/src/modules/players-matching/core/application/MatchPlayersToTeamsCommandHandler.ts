import { CommandHandler } from '../../../../shared/core/application/command/CommandHandler';
import { MatchPlayersToTeams } from './MatchPlayersToTeams';
import { CommandResult } from '../../../../shared/core/application/command/CommandResult';
import { matchPlayersFromEdges } from '../domain/MatchPlayersFromEdges';
import { DomainEventPublisher } from '../../../../shared/core/application/event/DomainEventBus';
import { CurrentTimeProvider } from '../../../../shared/core/CurrentTimeProvider';

export class MatchPlayersToTeamsCommandHandler implements CommandHandler<MatchPlayersToTeams> {
  constructor(private readonly eventPublisher: DomainEventPublisher, private readonly currentTimeProvider: CurrentTimeProvider) {}

  async execute(command: MatchPlayersToTeams): Promise<CommandResult> {
    const { events } = matchPlayersFromEdges(command, this.currentTimeProvider());
    this.eventPublisher.publishAll(events);
    return CommandResult.success();
  }
}
