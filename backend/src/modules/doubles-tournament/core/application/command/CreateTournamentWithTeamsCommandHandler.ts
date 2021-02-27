import { CommandHandler } from '../../../../../shared/core/application/command/CommandHandler';
import { DomainEventPublisher } from '../../../../../shared/core/application/event/DomainEventBus';
import { CurrentTimeProvider } from '../../../../../shared/core/CurrentTimeProvider';
import { CreateTournamentWithTeams } from './CreateTournamentWithTeams';
import { CommandResult } from '../../../../../shared/core/application/command/CommandResult';
import { createTournamentWithTeams } from '../../domain/DoublesTournament';
import { EntityIdGenerator } from '../../../../../shared/core/application/EntityIdGenerator';
import { DoublesTournamentRepository } from '../DoublesTournamentRepository';

export class CreateTournamentWithTeamsCommandHandler implements CommandHandler<CreateTournamentWithTeams> {
  constructor(
    private readonly eventPublisher: DomainEventPublisher,
    private readonly currentTimeProvider: CurrentTimeProvider,
    private readonly entityIdGenerator: EntityIdGenerator,
    private readonly repository: DoublesTournamentRepository,
  ) {}

  async execute(command: CreateTournamentWithTeams): Promise<CommandResult> {
    const tournamentId = command.tournamentId;
    const doublesTournament = await this.repository.findByTournamentId(tournamentId);

    const { state, events } = createTournamentWithTeams(doublesTournament, command, this.currentTimeProvider(), this.entityIdGenerator);
    await this.repository.save(state);
    this.eventPublisher.publishAll(events);
    return CommandResult.success();
  }
}
