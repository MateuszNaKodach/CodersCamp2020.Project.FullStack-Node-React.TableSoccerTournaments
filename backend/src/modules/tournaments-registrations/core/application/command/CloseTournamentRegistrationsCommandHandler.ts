import { CommandHandler } from '../../../../../shared/core/application/command/CommandHandler';
import { OpenTournamentRegistrations } from './OpenTournamentRegistrations';
import { CommandResult } from '../../../../../shared/core/application/command/CommandResult';
import { DomainEventBus } from '../../../../../shared/core/application/event/DomainEventBus';
import { closeTournamentRegistrations, openTournamentRegistrations, TournamentRegistrations } from '../../domain/TournamentRegistrations';
import { TournamentId } from '../../domain/TournamentId';
import { TournamentRegistrationsRepository } from '../TournamentRegistrationsRepository';
import { CloseTournamentRegistrations } from './CloseTournamentRegistrations';
import { CurrentTimeProvider } from '../../../../../shared/core/CurrentTimeProvider';

export class CloseTournamentRegistrationsCommandHandler implements CommandHandler<CloseTournamentRegistrations> {
  constructor(
    private readonly eventBus: DomainEventBus,
    private readonly currentTimeProvider: CurrentTimeProvider,
    private readonly repository: TournamentRegistrationsRepository,
  ) {}

  async execute(command: CloseTournamentRegistrations): Promise<CommandResult> {
    const tournamentId = TournamentId.from(command.tournamentId);
    const tournamentRegistrations = await this.repository.findByTournamentId(tournamentId);

    const { state, events } = closeTournamentRegistrations(tournamentRegistrations, { tournamentId }, this.currentTimeProvider);

    await this.repository.save(state);
    this.eventBus.publishAll(events);
    return CommandResult.success();
  }
}
