import { CommandHandler } from '../../../../../shared/core/application/command/CommandHandler';
import { StartTournament } from './StartTournament';
import { DomainEventPublisher } from '../../../../../shared/core/application/event/DomainEventBus';
import { CurrentTimeProvider } from '../../../../../shared/core/CurrentTimeProvider';
import { CommandResult } from '../../../../../shared/core/application/command/CommandResult';
import { DoublesTournamentRepository } from '../DoublesTournamentRepository';
import { startTournament } from '../../domain/DoublesTournament';

export class StartTournamentCommandHandler implements CommandHandler<StartTournament> {
  constructor(
    private readonly eventPublisher: DomainEventPublisher,
    private readonly currentTimeProvider: CurrentTimeProvider,
    private readonly repository: DoublesTournamentRepository,
  ) {}

  async execute(command: StartTournament): Promise<CommandResult> {
    const tournament = await this.repository.findByTournamentId(command.tournamentId);

    const { state, events } = startTournament(tournament, this.currentTimeProvider());

    await this.repository.save(state);
    this.eventPublisher.publishAll(events);
    return CommandResult.success();
  }
}
