import { CommandHandler } from '../../../../../shared/core/application/command/CommandHandler';
import { DomainEventPublisher } from '../../../../../shared/core/application/event/DomainEventBus';
import { CurrentTimeProvider } from '../../../../../shared/core/CurrentTimeProvider';
import { CommandResult } from '../../../../../shared/core/application/command/CommandResult';
import { EntityIdGenerator } from '../../../../../shared/core/application/EntityIdGenerator';
import { AddTournamentTables } from './AddTournamentTables';
import { TournamentTablesRepository } from '../TournamentTablesRepository';
import { assignTablesToTournament } from '../../domain/TournamentTable';

export class AddTournamentTablesCommandHandler implements CommandHandler<AddTournamentTables> {
  constructor(
    private readonly eventPublisher: DomainEventPublisher,
    private readonly currentTimeProvider: CurrentTimeProvider,
    private readonly entityIdGenerator: EntityIdGenerator,
    private readonly repository: TournamentTablesRepository,
  ) {}

  async execute(command: AddTournamentTables): Promise<CommandResult> {
    const tournamentId = command.tournamentId;
    const tournamentTables = await this.repository.findByTournamentId(tournamentId);

    const { state, events } = assignTablesToTournament(tournamentTables, command, this.currentTimeProvider(), this.entityIdGenerator);
    await this.repository.save(state);
    this.eventPublisher.publishAll(events);
    return CommandResult.success();
  }
}
