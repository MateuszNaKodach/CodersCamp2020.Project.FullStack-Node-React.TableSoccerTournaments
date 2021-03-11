import { CommandHandler } from '../../../../../shared/core/application/command/CommandHandler';
import { DomainEventPublisher } from '../../../../../shared/core/application/event/DomainEventBus';
import { CurrentTimeProvider } from '../../../../../shared/core/CurrentTimeProvider';
import { CommandResult } from '../../../../../shared/core/application/command/CommandResult';
import { AssignTournamentTables } from './AssignTournamentTables';
import { TournamentTablesRepository } from '../TournamentTablesRepository';
import { assignTablesToTournament } from '../../domain/TournamentTable';

export class AssignTournamentTablesCommandHandler implements CommandHandler<AssignTournamentTables> {
  constructor(
    private readonly eventPublisher: DomainEventPublisher,
    private readonly currentTimeProvider: CurrentTimeProvider,
    private readonly repository: TournamentTablesRepository,
  ) {}

  async execute(command: AssignTournamentTables): Promise<CommandResult> {
    const tournamentId = command.tournamentId;
    const tournamentTables = await this.repository.findTablesByTournamentId(tournamentId);

    const { state, events } = assignTablesToTournament(tournamentTables, command, this.currentTimeProvider());
    await this.repository.saveAll(state);
    this.eventPublisher.publishAll(events);
    return CommandResult.success();
  }
}
