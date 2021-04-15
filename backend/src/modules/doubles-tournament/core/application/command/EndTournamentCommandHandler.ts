import { CommandHandler } from '../../../../../shared/core/application/command/CommandHandler';
import { DomainEventPublisher } from '../../../../../shared/core/application/event/DomainEventBus';
import { CurrentTimeProvider } from '../../../../../shared/core/CurrentTimeProvider';
import { CommandResult } from '../../../../../shared/core/application/command/CommandResult';
import { DoublesTournamentRepository } from '../DoublesTournamentRepository';
import { endTournament } from '../../domain/DoublesTournament';
import { EndTournament } from './EndTournament';
import { TeamId } from '../../domain/TeamId';

export class EndTournamentCommandHandler implements CommandHandler<EndTournament> {
  constructor(
    private readonly eventPublisher: DomainEventPublisher,
    private readonly currentTimeProvider: CurrentTimeProvider,
    private readonly repository: DoublesTournamentRepository,
  ) {}

  async execute(command: EndTournament): Promise<CommandResult> {
    const winner = TeamId.from(command.winner);
    const tournament = await this.repository.findByTournamentId(command.tournamentId);

    const { state, events } = endTournament(tournament, winner, this.currentTimeProvider());

    await this.repository.save(state);
    this.eventPublisher.publishAll(events);
    return CommandResult.success();
  }
}
